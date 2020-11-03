import mongoose from "mongoose";
import User from "../user/user.model";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.method({
  objectResponse() {
    const transformed = {};
    const fields = ["id", "name", "description", "cuisine", "owner"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    if (this.owner instanceof User) {
      transformed["owner"] = this.owner.objectResponse();
    }

    return transformed;
  },
});

restaurantSchema.statics = {

  async detail(id) {
    let match = { id: mongoose.Types.ObjectId(id) };

    try {
      let aggregate = [
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
        { $unwind: "$owner" },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "restaurant",
            as: "reviews",
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            description: 1,
            cuisine: 1,
            createdAt: 1,
            "owner.id": "$owner._id",
            "owner.name": 1,
            rate: { $avg: "$reviews.rate" },
            reviewCount: { $size: "$reviews" },
          },
        },
        {
          $match: match,
        },
        { $limit: 1 },
      ];

      let restaurants = await this.aggregate(aggregate);
      if (restaurants.length == 0) {
        return null;
      } else {
        return restaurants[0];
      }
    } catch (error) {
      throw error;
    }
  },

  async list({
    page = 1,
    pageSize = 10,
    query,
    ownerId,
    rate,
    sortByRate = false,
  }) {
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    let match = {},
      sort = { createdAt: 1 };

    if (ownerId && mongoose.Types.ObjectId.isValid(ownerId)) {
      match["owner.id"] = mongoose.Types.ObjectId(ownerId);
    }

    if (query) {
      match["$or"] = [
        { name: RegExp(query, "i") },
        { description: RegExp(query, "i") },
        { cuisine: RegExp(query, "i") },
      ];
    }

    if (rate && parseInt(rate) > 0) {
      rate = parseInt(rate);
      match["rate"] = { $gte: rate, $lt: rate + 1 };
    }

    if (sortByRate) {
      sort = { rate: -1, createdAt: 1 };
    }

    try {
      let aggregate = [
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
        { $unwind: "$owner" },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "restaurant",
            as: "reviews",
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            description: 1,
            cuisine: 1,
            createdAt: 1,
            "owner.id": "$owner._id",
            "owner.name": 1,
            reviewCount: { $size: "$reviews" },
            rate: { $avg: "$reviews.rate" },
          },
        },
        { $match: match },
        { $sort: sort },
        { $skip: pageSize * (page - 1) },
      ];

      if (pageSize > 0) {
        aggregate.push({ $limit: parseInt(pageSize) });
      }
      console.log(aggregate);
      let restaurants = await this.aggregate(aggregate);

      if (match["owner.id"]) {
        match["owner"] = match["owner.id"];
        delete match["owner.id"];
      }
      let total = await this.countDocuments(match).exec();
      return { restaurants, total, page, pageSize };
    } catch (error) {
      throw error;
    }
  },
};

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;

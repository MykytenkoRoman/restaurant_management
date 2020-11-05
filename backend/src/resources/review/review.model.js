import mongoose from 'mongoose';
import User from '../user/user.model';
import Restaurant from '../restaurant/restaurant.model';

const reviewSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
    },

    rate: {
      type: Number,
      required: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },

    reply: {
      type: String
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


reviewSchema.method({
  objectResponse() {
    const transformed = {};
    const fields = [
      "id",
      "rate",
      "visitDate",
      "comment",
      "reply",
      "user",
      "restaurant",
      "createdAt"
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    if (this.user instanceof User) {
      transformed["user"] = this.user.objectResponse();
    }

    if (this.restaurant instanceof Restaurant) {
      transformed["restaurant"] = this.restaurant.objectResponse();
    }

    return transformed;
  },
});


reviewSchema.statics = {

  async list({
    page = 1,
    pageSize = 10,
    rate,
    restaurantId,
    ownerId,
    noreply = false,
  }) {
    let match = {};
    if (ownerId && mongoose.Types.ObjectId.isValid(ownerId)) {
      match["restaurant.owner"] = mongoose.Types.ObjectId(ownerId);
    }

    if (restaurantId && mongoose.Types.ObjectId.isValid(restaurantId)) {
      match["restaurant.id"] = mongoose.Types.ObjectId(restaurantId);
    }

    if (rate && parseInt(rate) > 0) {
      match["rate"] = parseInt(rate);
    }

    if (noreply === true || noreply === "true") {
      match["reply"] = { $exists: false };
    }
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    try {
      let aggregate = [
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "restaurant",
          },
        },
        { $unwind: "$restaurant" },
        {
          $project: {
            _id: 0,
            id: "$_id",
            rate: 1,
            visitDate: 1,
            comment: 1,
            reply: 1,
            createdAt: 1,
            "user.id": "$user._id",
            "user.name": 1,
            "restaurant.id": "$restaurant._id",
            "restaurant.name": 1,
            "restaurant.owner": 1,
          },
        },
        {
          $match: match,
        },
        { $sort: { createdAt: -1 } },
        { $skip: pageSize * (page - 1) },
      ];

      if (pageSize > 0) {
        aggregate.push({ $limit: parseInt(pageSize) });
      }
      let reviews = await this.aggregate(aggregate);

      let countAggregate = [
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "restaurant",
          },
        },
        { $unwind: "$restaurant" },
        {
          $project: {
            _id: 0,
            id: "$_id",
            rate: 1,
            visitDate: 1,
            comment: 1,
            reply: 1,
            createdAt: 1,
            "restaurant.id": "$restaurant._id",
            "restaurant.name": 1,
            "restaurant.owner": 1,
          },
        },
        {
          $match: match,
        },
        {
          $count: "count",
        },
      ];
      let count = await this.aggregate(countAggregate);
      let total = 0;
      if (count && count.length > 0) {
        total = count[0].count;
      }

      return { reviews, total, page, pageSize };
    } catch (error) {
      throw error;
    }
  },
};

const Review = mongoose.model("Review", reviewSchema);

export default Review;

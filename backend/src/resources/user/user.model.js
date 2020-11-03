import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['admin', 'owner', 'customer'],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  objectResponse() {
    const transformed = {};
    const fields = ["id", "name", "email", "role", "createdAt"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  },
});

userSchema.statics = {
  async list({ page = 1, pageSize = 10, search }) {
    let match = {};
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    if (search) {
      match["$or"] = [
        {
          name: RegExp(search, "i"),
        },
        {
          email: RegExp(search, "i"),
        },
        {
          role: RegExp(search, "i"),
        },
      ];
    }

    try {
      let aggregate = [
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            email: 1,
            role: 1,
            createdAt: 1,
          },
        },
        {
          $match: match,
        },
        { $sort: { createdAt: 1 } },
        { $skip: pageSize * (page - 1) },
      ];

      if (pageSize > 0) {
        aggregate.push({ $limit: parseInt(pageSize) });
      }

      let users = await this.aggregate(aggregate);
      let total = await this.countDocuments(match).exec();

      return {
        users,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      throw error;
    }
  },
};

const User = mongoose.model("User", userSchema);

export default User;

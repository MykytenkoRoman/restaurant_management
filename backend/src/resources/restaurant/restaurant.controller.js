import httpStatus from "http-status";
import Restaurant from "./restaurant.model";
import Review from "../review/review.model";
import { Role } from "../../config";

const load = async (req, res, next, id) => {
  try {
    let restaurant = await Restaurant.findById(id).populate("owner").exec();

    if (!restaurant) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Restaurant does not exist" });
    }

    req.locals = { restaurant };
    return next();
  } catch (error) {
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    let restaurant = await Restaurant.get(req.locals.restaurant._id);
    let reviewProperties = "id rate comment reply, user, visitDate";
    let restaurantId = req.locals.restaurant._id;
    let highestReview = await Review.findOne({ restaurant: restaurantId }, reviewProperties, { sort: { rate: -1 } }).populate("user");
    let lowestReview = await Review.findOne({ restaurant: restaurantId }, reviewProperties, { sort: { rate: 1 } }).populate("user");
    if (highestReview && lowestReview) {
      restaurant.highestReview = highestReview.objectResponse();
      restaurant.lowestReview = lowestReview.objectResponse();
    }

    const myReview = await Review.findOne({restaurant: restaurantId, user: req.user._id});
    if (myReview) {
      restaurant.reviewed = true;
    } else {
      restaurant.reviewed = false;
    }

    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const restaurant = new Restaurant(req.body);
    restaurant.owner = req.user;
    const savedRestaurant = await restaurant.save();
    res.status(httpStatus.CREATED);
    res.json(savedRestaurant.objectResponse());
  } catch (error) {
    next(error);
  }
};

const update = (req, res, next) => {
  const restaurantData = req.body;
  if (
    req.user.role !== Role.Admin &&
    !req.locals.restaurant.owner.equals(req.user.id)
  ) {
    return res
      .status(httpStatus.FORBIDDEN)
      .json({ message: "You don't have permission." });
  }

  const restaurant = Object.assign(req.locals.restaurant, restaurantData);
  restaurant
    .save()
    .then((savedRestaurant) => res.json(savedRestaurant.objectResponse()))
    .catch((e) => next(e));
};

const list = async (req, res, next) => {
  try {
    const { user } = req;
    let query = req.query;

    if (user.role === Role.Owner) {
      query["ownerId"] = user._id;
    }
    if (user.role === Role.Customer) {
      query["sortByRate"] = true;
    }

    let restaurants = await Restaurant.list({ ...req.query });
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { restaurant } = req.locals;

  if (
    req.user.role !== Role.Admin &&
    !req.locals.restaurant.owner.equals(req.user._id)
  ) {
    return res
      .status(httpStatus.FORBIDDEN)
      .json({ message: "You don't have permission." });
  }

  try {
    await Review.deleteMany({ restaurant: restaurant._id });
    await restaurant.remove();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (e) {
    next(e);
  }
};

export default {
  load,
  get,
  create,
  update,
  list,
  remove,
};

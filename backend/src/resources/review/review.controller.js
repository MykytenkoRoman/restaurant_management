import httpStatus from 'http-status';
import Review from './review.model';
import { Role } from '../../config';

const load = async (req, res, next, id) => {
  try {
    let review = await Review.findById(id).populate("user").populate("restaurant").exec();

    if (!review) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Review does not exist" });
    }

    req.locals = { review };
    return next();
  } catch (error) {
    return next(error);
  }
};

const get = (req, res) => res.json(req.locals.review.objectResponse());

const create = async (req, res, next) => {
  try {
    const user = req.user, restaurant = req.locals.restaurant;
    const existingReview = await Review.findOne({ user: user._id, restaurant: restaurant._id });

    if (existingReview) {
      const error = new APIError({
        message: "You already left review to this restaurant.",
        status: httpStatus.FORBIDDEN
      });
      throw error;
    }

    const review = new Review(req.body);
    review.user = req.user;
    review.restaurant = req.locals.restaurant;
    const savedReview = await review.save();
    res.status(httpStatus.CREATED);
    res.json(savedReview.objectResponse());
  } catch (error) {
    next(error);
  }
};

const update = (req, res, next) => {
  const reviewData = req.body;
  const review = Object.assign(req.locals.review, reviewData);
  review.save()
    .then(savedReview => res.json(savedReview.objectResponse()))
    .catch(e => next(e));
};

const list = async (req, res, next) => {
  try {
    let reviews = await Review.list({ ...req.query });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const listForRestaurant = async (req, res, next) => {
  try {
    const { restaurant } = req.locals;
    let reviews = await Review.list({ ...req.query, restaurantId: restaurant._id });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const listPending = async (req, res, next) => {
  try {
    const { user } = req;
    let reviews = await Review.list({ ...req.query, ownerId: user._id, noreply: true });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { review } = req.locals;
  try {
    await review.remove();
    res.status(httpStatus.NO_CONTENT).end()
  } catch (e) {
    next(e);
  }
};

const createReply = async (req, res, next) => {
  try {
    const user = req.user, review = req.locals.review;
    
    if (user.role !== Role.Admin && !review.restaurant.owner.equals(user._id)) {
      const error = new APIError({
        message: "You are not the owner of the restaurant.",
        status: httpStatus.FORBIDDEN
      });
      throw error;
    }
    if (review.reply) {
      const error = new APIError({
        message: "You already replied to this review.",
        status: httpStatus.FORBIDDEN
      });
      throw error;
    }

    review.reply = req.body.reply;

    const savedReview = await review.save();
    res.json(savedReview.objectResponse());
  } catch (error) {
    next(error);
  }
};

const updateReply = async (req, res, next) => {
  try {
    const review = req.locals.review;

    if (!review.reply) {
      const error = new APIError({
        message: "There's no reply to this review.",
        status: httpStatus.FORBIDDEN
      });
      throw error;
    }

    review.reply = req.body.reply;

    const savedReview = await review.save();
    res.json(savedReview.objectResponse());
  } catch (error) {
    next(error);
  }
};

const removeReply = async (req, res, next) => {
  const { review } = req.locals;
  try {
    review.reply = undefined;
    const savedReview = await review.save();
    res.json(savedReview.objectResponse());
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
  listForRestaurant,
  listPending,
  remove,
  createReply,
  updateReply,
  removeReply
};
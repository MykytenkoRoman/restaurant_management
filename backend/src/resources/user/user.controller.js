import httpStatus from 'http-status';
import { omit } from 'lodash';
import User from './user.model';
import Restaurant from '../restaurant/restaurant.model';
import Review from '../review/review.model';
import { Role } from '../../config';

const load = async (req, res, next, id) => {
  try {
    let user = await User.findById(id).exec();
    
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User does not exist" });
    }

    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

const get = (req, res) => res.json(req.locals.user.objectResponse());

const create = async (req, res, next) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "Email already exists." });
    }
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.objectResponse());
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    if (req.locals.user.email !== req.body.email) {
      const existing = await User.findOne({ email: req.body.email });
      if (existing) {
        return res
        .status(httpStatus.CONFLICT)
        .json({ message: "Email already exists." });
      }
    }
    const ommitRole = req.user.role !== Role.Admin ? "role" : "";
    const updatedUser = omit(req.body, ommitRole);
    const user = Object.assign(req.locals.user, updatedUser);
    const savedUser = await user.save();
    res.json(savedUser.objectResponse());
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    let users = await User.list(req.query);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { user } = req.locals;

  try {
    const restaurants = await Restaurant.find({ owner: user._id });
    for (let restaurant of restaurants) {
      await Review.deleteMany({ restaurant: restaurant._id });
    }
    await Restaurant.deleteMany({ owner: user._id });
    await Review.deleteMany({ user: user._id });
    await user.remove();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

const me = (req, res) => res.json(req.user.objectResponse());

const updateMe = async (req, res, next) => {
  try {
    if (req.user.email !== req.body.email) {
      const existing = await User.findOne({ email: req.body.email });
      if (existing) {
        return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: "Email already exists." });
      }
    }
    const updatedUser = omit(req.body, "role");
    const user = Object.assign(req.user, updatedUser);
    const savedUser = await user.save();
    res.json(savedUser.objectResponse());
  } catch (error) {
    next(error);
  }
};

export default {
  load,
  get,
  create,
  update,
  list,
  me,
  updateMe,
  remove
}
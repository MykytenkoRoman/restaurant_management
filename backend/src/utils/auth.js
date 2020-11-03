import config from "../config";
import User from "../resources/user/user.model";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const authorize = (...roles) => async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Web token is invalid." });
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Web token is invalid." });
  }

  const user = await User.findById(payload.id).select("-password").exec();

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'User not authorized' });
  }
  
  if (roles.length > 0 && !roles.includes(user.role)) {
    return res.status(httpStatus.FORBIDDEN).send({ message: "You don't have permission" });
  }
  req.user = user;
  next();
};

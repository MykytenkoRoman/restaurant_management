import httpStatus from 'http-status';
import User from '../user/user.model';
import { newToken } from "../../utils/auth";

const signup = async (req, res) => {
  try {
    const userData = req.body;
    const existing = await User.findOne({ email: userData.email });
    if (existing) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "Email already exists" });
    }
    const user = await new User(userData).save();
    const token = newToken(user);
    return res.status(httpStatus.CREATED).json({ token, user: user.objectResponse() });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const signin = async (req, res, next) => {

  const invalid = { message: "Email or password is not correct" };

  try {
    const user = await User.findOne({ email: req.body.email })
      .exec();
    
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(httpStatus.UNAUTHORIZED).send(invalid);
    }

    const token = newToken(user);
    return res.send({ token, user: user.objectResponse() });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: e.message });
  }
};


export default {
  signup,
  signin
}
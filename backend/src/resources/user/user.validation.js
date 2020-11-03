import Joi from "joi";
import { Role } from "../../config";

const validationSchema = {
  createUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128),
      role: Joi.string().valid(...Object.values(Role)),
    }).options({ allowUnknown: true }),
  },

  updateUser: {
    body: Joi.object({
      email: Joi.string().email(),
      password: Joi.string(),
      name: Joi.string().max(128),
      role: Joi.string().valid(...Object.values(Role)),
    }).options({ allowUnknown: true }),
  },
};
export default validationSchema;
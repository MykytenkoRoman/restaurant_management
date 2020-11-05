import Joi from "joi";

const validationSchema = {
  createReview: {
    body: Joi.object({
      rate: Joi.number().min(1).max(5).required(),
      visitDate: Joi.date().max('now').required(),
      comment: Joi.string().required(),
    }).options({ allowUnknown: true }),
  },

  updateReview: {
    body: Joi.object({
      rate: Joi.number().min(1).max(5),
      visitDate: Joi.date().max('now'),
      comment: Joi.string(),
    }).options({ allowUnknown: true }),
  },
};

export default validationSchema;
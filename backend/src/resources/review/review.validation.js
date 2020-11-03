import Joi from "joi";

const validationSchema = {
  createReview: {
    body: Joi.object({
      rate: Joi.number().required(),
      visitDate: Joi.date().required(),
      comment: Joi.string().required(),
    }).options({ allowUnknown: true }),
  },

  updateReview: {
    body: Joi.object({
      rate: Joi.number(),
      visitDate: Joi.date(),
      comment: Joi.string(),
    }).options({ allowUnknown: true }),
  },
};

export default validationSchema;
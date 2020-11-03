import httpStatus from 'http-status';
import expressValidation from 'express-validation';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    const details = err.details;
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Validation Error", errors: details });
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export const notFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).send({ message: "API not found" });
};

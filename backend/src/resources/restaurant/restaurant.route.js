import express from "express";
import { validate } from "express-validation";
import controller from "./restaurant.controller";
import reviewController from "../review/review.controller";
import { authorize } from "../../utils/auth";
import { Role } from "../../config";
import validation from "./restaurant.validation";
import reviewValidation from "../review/review.validation";

const router = express.Router();

router
  .route("/")
  .get(authorize(), controller.list)
  .post(
    authorize(Role.Owner),
    validate(validation.createRestaurant),
    controller.create
  );

router
  .route("/:restaurantId")
  .get(authorize(), controller.get)
  .patch(
    authorize(Role.Owner, Role.Admin),
    validate(validation.updateRestaurant),
    controller.update
  )
  .delete(authorize(Role.Owner, Role.Admin), controller.remove);

router
  .route("/:restaurantId/reviews")
  .get(authorize(), reviewController.listForRestaurant)
  .post(authorize(Role.Customer), validate(reviewValidation.createReview), reviewController.create);

router.param("restaurantId", controller.load);

module.exports = router;

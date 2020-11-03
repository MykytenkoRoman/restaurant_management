import express from "express";
import { validate } from "express-validation";
import controller from "./review.controller";
import { authorize } from "../../utils/auth";
import { Role } from "../../config";
import validation from "./review.validation";

const router = express.Router();

router.route("/").get(authorize(), controller.list);

router
  .route("/pending")
  .get(authorize(Role.Owner), controller.listPending);

router
  .route("/:reviewId")
  .get(authorize(Role.Admin), controller.get)
  .patch(authorize(Role.Admin), validate(validation.updateReview), controller.update)
  .delete(authorize(Role.Admin), controller.remove);

router
  .route("/:reviewId/reply")
  .post(authorize(), controller.createReply)
  .patch(authorize(Role.Admin), controller.updateReply)
  .delete(authorize(Role.Admin), controller.removeReply);

router.param("reviewId", controller.load);

export default router;

import express from "express";
import { validate } from "express-validation";
import controller from "./user.controller";
import { authorize } from "../../utils/auth";
import { Role } from "../../config";
import validation from "./user.validation";
const router = express.Router();

router.route("/").get(authorize(Role.Admin), controller.list);

router
  .route("/me")
  .get(authorize(), controller.me)
  .patch(authorize(), validate(validation.updateUser), controller.updateMe);

router
  .route("/:userId")
  .get(authorize(Role.Admin), controller.get)
  .patch(
    authorize(Role.Admin),
    validate(validation.updateUser),
    controller.update
  )
  .delete(authorize(Role.Admin), controller.remove);

router.param("userId", controller.load);

export default router;

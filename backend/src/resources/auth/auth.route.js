import express from 'express';
import { validate } from 'express-validation';
import controller from './auth.controller';
import validation from './auth.validation';

const router = express.Router();

router.route("/signup").post(validate(validation.signup), controller.signup);
router.route("/signin").post(validate(validation.signin), controller.signin);
module.exports = router;

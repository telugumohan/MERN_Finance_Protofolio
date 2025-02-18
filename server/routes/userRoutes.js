import express from "express"
import { signInController, signUpController } from "../controllers/userControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/signin', signInController);
router.post('/signup', signUpController);

export default router;
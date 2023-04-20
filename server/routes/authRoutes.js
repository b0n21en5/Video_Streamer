import express from "express";
import {
  forgotPasswordController,
  loginCotroller,
  registerController,
} from "../controller/authController.js";

// router object
const router = express.Router();

// routing
// user register route
router.post("/register", registerController);

// user login route
router.post("/login", loginCotroller);

// forgot password route
router.post("/forgot-password", forgotPasswordController);

export default router;

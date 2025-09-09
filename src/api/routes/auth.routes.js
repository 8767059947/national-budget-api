import express from "express"
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.route("/register").post(registerUser);

//login route
router.route("/login").post(loginUser);

//protected route
router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;

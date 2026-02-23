import express from "express";
import {
  checkCookie,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/check-cookie", checkCookie);
router.post("/logout", logoutUser);

export default router;

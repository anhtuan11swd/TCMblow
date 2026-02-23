import express from "express";
import {
  changeAvatar,
  changeUserPassword,
  checkCookie,
  getProfileData,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/check-cookie", checkCookie);
router.post("/logout", logoutUser);
router.get("/get-profile-data", authMiddleware.verifyToken, getProfileData);
router.patch(
  "/change-user-password",
  authMiddleware.verifyToken,
  changeUserPassword,
);
router.put(
  "/change-avatar",
  authMiddleware.verifyToken,
  upload.single("image"),
  changeAvatar,
);

export default router;

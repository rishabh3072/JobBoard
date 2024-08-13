import express from "express";
import {
  login,
  register,
  logout,
  getUser,
  updateProfile,
  uploadProfilePicture,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

router.put("/update", isAuthenticated, updateProfile);
router.post("/uploadProfilePicture", isAuthenticated, uploadProfilePicture);

export default router;

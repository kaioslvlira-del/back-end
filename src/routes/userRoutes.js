import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getProfile,
  updateProfile,
  getUsers,
  toggleAdmin,
} from "../controllers/userController.js";

const router = Router();

// 👤 PERFIL
router.get("/me", isAuth, getProfile);
router.put("/me", isAuth, updateProfile);

// 🔒 ADMIN
router.get("/users", isAuth, isAdmin, getUsers);
router.patch("/users/:id/admin", isAuth, isAdmin, toggleAdmin);

export default router;

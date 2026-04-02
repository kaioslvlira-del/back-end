import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

import {
  createKey,
  getKeys,
  toggleKey,
  deleteKey,
} from "../controllers/keyController.js";

const router = Router();

router.get("/", isAuth, isAdmin, getKeys);
router.post("/", isAuth, isAdmin, createKey);
router.patch("/:id/toggle", isAuth, isAdmin, toggleKey);
router.delete("/:id", isAuth, isAdmin, deleteKey);

export default router;

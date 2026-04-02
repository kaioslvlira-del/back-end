import { Router } from "express";
import productRoutes from "./productRoutes.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import keyRoutes from "./keyRoutes.js";

const router = Router();

// AUTH
router.use("/auth", authRoutes);

// 🔥 USER (FALTAVA ISSO)
router.use("/user", userRoutes);

// PRODUTOS
router.use("/products", productRoutes);

router.use("/keys", keyRoutes);

export default router;

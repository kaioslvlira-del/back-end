import { Router } from "express";
import {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
} from "../controllers/productController.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;

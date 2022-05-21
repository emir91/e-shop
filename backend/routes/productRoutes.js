import express from "express"
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productControllers.js"
import protect from "../middleware/authMiddleware.js"
import admin from "../middleware/adminMiddleware.js"

const router = express.Router()

router.get("/", getProducts)

router.get("/:id", getProductById)
router.delete("/:id", protect, admin, deleteProduct)

export default router

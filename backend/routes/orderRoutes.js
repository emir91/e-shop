import express from "express"
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from "../controllers/orderControllers.js"
import protect from "../middleware/authMiddleware.js"
import admin from "../middleware/adminMiddleware.js"

const router = express.Router()

router.post("/", protect, addOrderItems)
router.get("/", protect, admin, getOrders)
router.get("/myorders", protect, getMyOrders)
router.get("/:id", protect, getOrderById)
router.put("/:id/pay", protect, updateOrderToPaid)

export default router

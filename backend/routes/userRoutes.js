import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from "../controllers/userControllers.js"
import protect from "../middleware/authMiddleware.js"
import admin from "../middleware/adminMiddleware.js"

const router = express.Router()

router.post("/", registerUser)
router.get("/", protect, admin, getUsers)
router.post("/login", authUser)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUserProfile)

export default router

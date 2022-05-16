import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userControllers.js"
import protect from "../middleware/authMiddleware.js"
import admin from "../middleware/adminMiddleware.js"

const router = express.Router()

router.post("/", registerUser)
router.get("/", protect, admin, getUsers)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUserProfile)
router.delete("/:id", protect, admin, deleteUser)
router.get("/:id", protect, admin, getUserById)
router.put("/:id", protect, admin, updateUser)
router.post("/login", authUser)

export default router

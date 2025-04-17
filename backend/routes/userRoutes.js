import express from "express";
import {
  createUser,
  deductCredits,
  getUserCredits,
  getUserByClerkId,
} from "../controllers/userController.js";

const router = express.Router();

// Route to create user
router.post("/create-user", createUser);
router.post("/deduct-credits", deductCredits);
router.post("/get-credits", getUserCredits);
router.get("/:clerkId", getUserByClerkId);

export default router;

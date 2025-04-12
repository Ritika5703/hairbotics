import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// Route to create user
router.post("/create-user", createUser);

export default router;

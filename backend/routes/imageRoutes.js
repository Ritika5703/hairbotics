import express from "express";
import {
  getUserImages,
  uploadImage,
  classifyImage,
  deleteImage,
} from "../controllers/imageController.js";

const router = express.Router();

// Get user images
router.get("/user/:userId", getUserImages);

// Upload image with prediction
router.post("/upload", uploadImage);

// Classify image and save
router.post("/classify", classifyImage);

// Delete an image by ID
router.delete("/:id", deleteImage);

export default router;

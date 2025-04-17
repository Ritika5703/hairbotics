import Image from "../models/Image.js";

// Fetch user images
export const getUserImages = async (req, res) => {
  try {
    const { userId } = req.params;
    const images = await Image.find({ userId }).sort({ timestamp: -1 });

    if (!images || images.length === 0) {
      return res.status(404).json({ message: "No images found for this user" });
    }

    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching user images:", error);
    res.status(500).json({ message: "Failed to fetch image history" });
  }
};

// Upload Image with prediction
export const uploadImage = async (req, res) => {
  try {
    const { userId, imageUrl, prediction } = req.body;

    const newImage = new Image({
      userId,
      imageUrl,
      prediction,
    });

    await newImage.save();
    res
      .status(201)
      .json({ message: "Image saved successfully", image: newImage });
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ message: "Failed to save image" });
  }
};

// New classification + saving route
export const classifyImage = async (req, res) => {
  try {
    const { userId, imageUrl, prediction } = req.body;
    if (!userId || !imageUrl || !prediction) {
      return res.status(400).json({
        message: "Missing required fields: userId, imageUrl, or prediction",
      });
    }
    const newImage = new Image({
      userId,
      imageUrl,
      prediction,
      timestamp: new Date(),
    });

    await newImage.save();
    res.status(200).json({
      message: "Image classified and saved",
      image: newImage,
    });
  } catch (error) {
    console.error("Error classifying image:", error);
    res.status(500).json({ message: "Classification failed" });
  }
};

// Delete an image by ID
export const deleteImage = async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);

    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};

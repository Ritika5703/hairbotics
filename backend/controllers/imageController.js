import Image from "../models/Image.js";

// Fetch user images
export const getUserImages = async (req, res) => {
  try {
    const { userId } = req.params;
    // IMPROVEMENT: Added pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const images = await Image.find({ userId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    // IMPROVEMENT: Get total count for pagination info
    const total = await Image.countDocuments({ userId });

    if (!images || images.length === 0) {
      return res.status(404).json({ message: "No images found for this user" });
    }

    res.status(200).json({
      images,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching user images:", error);
    res.status(500).json({ message: "Failed to fetch image history" });
  }
};

// Upload Image with prediction
export const uploadImage = async (req, res) => {
  try {
    const { userId, imageUrl, prediction, suggestions, metadata } = req.body;

    const newImage = new Image({
      userId,
      imageUrl,
      prediction,
      suggestions,
      metadata,
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
    const { userId, imageUrl, prediction, suggestions, metadata } = req.body;
    if (!userId || !imageUrl || !prediction) {
      return res.status(400).json({
        message: "Missing required fields: userId, imageUrl, or prediction",
      });
    }
    const newImage = new Image({
      userId,
      imageUrl,
      prediction,
      suggestions,
      metadata,
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
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json(image);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Failed to fetch image" });
  }
};
// IMPROVEMENT: New route to add or update suggestions for an existing image
export const updateSuggestions = async (req, res) => {
  try {
    const { id } = req.params;
    const { suggestions } = req.body;

    if (!suggestions) {
      return res.status(400).json({ message: "Suggestions data is required" });
    }

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { suggestions },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({
      message: "Image suggestions updated successfully",
      image: updatedImage,
    });
  } catch (error) {
    console.error("Error updating suggestions:", error);
    res.status(500).json({ message: "Failed to update suggestions" });
  }
};

import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  prediction: {
    label: String,
    confidence: Number,
  },
  // IMPROVEMENT: Added detailed structure for suggestions
  suggestions: {
    condition: String,
    description: String,
    tips: [String],
    products: [String],
  },
  // IMPROVEMENT: Added metadata field for additional analysis info
  metadata: {
    device: String,
    dimensions: {
      width: Number,
      height: Number,
    },
    fileSize: Number,
    fileType: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Image", imageSchema);

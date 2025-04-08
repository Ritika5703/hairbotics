import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  prediction: {
    label: String,
    confidence: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Image", imageSchema);

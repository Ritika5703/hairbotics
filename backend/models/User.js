import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    clerkId: { type: String, unique: true, required: true },
    credits: { type: Number, default: 150 }, // Initial credits
    plan: { type: String, default: "Free" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

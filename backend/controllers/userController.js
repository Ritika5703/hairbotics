import User from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
  const { clerkId, email, userId } = req.body;

  console.log("Received data:", req.body);

  if (!clerkId) {
    return res.status(400).json({ error: "clerkId is required" });
  }

  try {
    // Attempt to find or create the user
    const existingUser = await User.findOneAndUpdate(
      { $or: [{ clerkId }, { email }] }, // Search by clerkId or email
      { clerkId, email, userId }, // Update if found
      { upsert: true, new: true } // Create if not found
    );

    console.log("✅ User processed (updated or created)", existingUser);

    return res.status(201).json({ message: "User processed successfully" });
  } catch (error) {
    console.error("Error creating/updating user:", error);

    // Specific check for MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        error:
          "Duplicate key error, user already exists with this email or clerkId",
      });
    }

    return res.status(500).json({ error: "Error creating user" });
  }
};
// GET user by Clerk ID
export const getUserByClerkId = async (req, res) => {
  const { clerkId } = req.params;
  try {
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};
// Deduct 25 credits
export const deductCredits = async (req, res) => {
  const { clerkId } = req.body;

  try {
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.credits < 25)
      return res.status(403).json({ error: "Not enough credits" });

    user.credits -= 25;
    await user.save();

    res.status(200).json({ credits: user.credits });
  } catch (error) {
    res.status(500).json({ error: "Error deducting credits" });
  }
};
export const getUserCredits = async (req, res) => {
  const { clerkId } = req.body;
  try {
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ credits: user.credits });
  } catch (error) {
    res.status(500).json({ error: "Error fetching credits" });
  }
};

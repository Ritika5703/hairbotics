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

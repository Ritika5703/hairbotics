import User from "../models/User";

// Create a new user
export const createUser = async (req, res) => {
  const { userId, email } = req.body;

  if (!userId || !email) {
    return res.status(400).json({ message: "Missing user data" });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ userId });

    if (!existingUser) {
      // Save to MongoDB
      const newUser = new User({ userId, email });
      await newUser.save();
      console.log("✅ User saved to MongoDB");
      return res.status(201).json({ message: "User created" });
    } else {
      return res.status(200).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};

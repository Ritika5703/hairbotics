// import User from "../models/User.js";

// // Register or login user (Clerk ID based)
// export const registerUser = async (req, res) => {
//   const { clerkId, email } = req.body;
//   try {
//     let user = await User.findOne({ clerkId });
//     if (!user) {
//       user = new User({ clerkId, email });
//       await user.save();
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

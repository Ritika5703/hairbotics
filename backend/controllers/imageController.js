// import ImagePrediction from "../models/Image.js";

// export const saveImagePrediction = async (req, res) => {
//   const { imageUrl, prediction, confidence } = req.body;
//   const userId = req.userId;

//   try {
//     const image = new ImagePrediction({
//       user: userId,
//       imageUrl,
//       prediction,
//       confidence,
//     });
//     await image.save();
//     res.status(201).json(image);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getUserImages = async (req, res) => {
//   const userId = req.userId;
//   try {
//     const images = await ImagePrediction.find({ user: userId }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(images);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

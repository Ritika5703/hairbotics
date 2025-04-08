import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import CameraCapturePage from "./CameraCapture";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const PhotoPage: React.FC = () => {
  const [isCameraView, setIsCameraView] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[] | null>(null);
  const [model, setModel] = useState<any | null>(null);

  const { user } = useUser(); // 👈 Get Clerk user

  const modelURL =
    "https://teachablemachine.withgoogle.com/models/655WLkBQN/model.json";
  const metadataURL =
    "https://teachablemachine.withgoogle.com/models/655WLkBQN/metadata.json";

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const classifyImage = async (file: File) => {
    if (!model || !imageSrc || !user?.id) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      const prediction = await model.predict(img);
      setPredictions(prediction);

      // Extract top prediction
      const topPrediction = prediction.reduce((prev, curr) =>
        curr.probability > prev.probability ? curr : prev
      );

      try {
        await axios.post("http://localhost:5000/api/images/classify", {
          userId: user.id,
          imageUrl: imageSrc, // base64 or url depending on usage
          prediction: {
            label: topPrediction.className,
            confidence: Math.round(topPrediction.probability * 100),
          },
        });

        console.log("✅ Image classified and saved");
      } catch (error) {
        console.error("❌ Error sending data:", error);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col items-center justify-center">
      {isCameraView ? (
        <CameraCapturePage
          setImageSrc={setImageSrc}
          setIsCameraView={setIsCameraView}
          classifyImage={classifyImage}
        />
      ) : (
        <ImageUploader
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          predictions={predictions}
          classifyImage={classifyImage}
          setIsCameraView={setIsCameraView}
        />
      )}
    </div>
  );
};

export default PhotoPage;

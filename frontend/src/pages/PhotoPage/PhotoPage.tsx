import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import CameraCapturePage from "./CameraCapture";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

interface Prediction {
  className: string;
  probability: number;
}

const PhotoPage: React.FC = () => {
  const [isCameraView, setIsCameraView] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);

  const { user } = useUser();

  const modelURL =
    "https://teachablemachine.withgoogle.com/models/q-XcmC2jK/model.json";
  const metadataURL =
    "https://teachablemachine.withgoogle.com/models/q-XcmC2jK/metadata.json";

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const classifyImage = async (file: File) => {
    if (!model || !user?.id) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      try {
        const prediction = await model.predict(img);
        setPredictions(prediction);

        const topPrediction = prediction.reduce((prev, curr) =>
          curr.probability > prev.probability ? curr : prev
        );

        await axios.post("http://localhost:5000/api/images/classify", {
          userId: user.id,
          imageUrl: imageSrc,
          prediction: {
            label: topPrediction.className,
            confidence: Math.round(topPrediction.probability * 100),
          },
        });

        console.log("✅ Image classified and saved");
      } catch (error) {
        console.error("❌ Error during classification:", error);
      }
    };

    img.onerror = () => {
      alert("Failed to load the image. Try another one.");
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

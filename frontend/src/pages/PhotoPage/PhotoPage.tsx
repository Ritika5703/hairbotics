import React, { useState, useEffect, useRef } from "react";
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
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const modelURL =
    "https://teachablemachine.withgoogle.com/models/q-XcmC2jK/model.json";
  const metadataURL =
    "https://teachablemachine.withgoogle.com/models/q-XcmC2jK/metadata.json";

  // Ref to manage loading state and avoid unnecessary re-renders
  const isLoadingRef = useRef(false);

  const forceUpdate = () => {}; // Empty function to trigger re-render

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
    setLoading(true); // Start blur
    isLoadingRef.current = true; // Set loading ref to true

    img.onload = async () => {
      try {
        const prediction = await model.predict(img);
        setPredictions(prediction);

        const topPrediction = prediction.reduce((prev, curr) =>
          curr.probability > prev.probability ? curr : prev
        );

        await axios.post("http://localhost:5000/api/images/classify", {
          userId: user.id,
          imageUrl: img.src,
          prediction: {
            label: topPrediction.className,
            confidence: Math.round(topPrediction.probability * 100),
          },
        });

        console.log("✅ Image classified and saved");
      } catch (error) {
        console.error("❌ Error during classification:", error);
      } finally {
        setLoading(false); // Remove blur
        isLoadingRef.current = false; // Set loading ref to false
      }
    };

    img.onerror = () => {
      alert("Failed to load the image. Try another one.");
      setLoading(false);
      isLoadingRef.current = false;
    };
  };
  useEffect(() => {
    if (!loading) {
      console.log("Loading finished, removing blur effect");
    }
  }, [loading]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col items-center justify-center transition duration-300 ${
        loading ? "blur-sm pointer-events-none" : ""
      }`}
    >
      {loading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg z-50">
          🔍 Analyzing image...
        </div>
      )}
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
          setIsLoading={setLoading}
        />
      )}
    </div>
  );
};

export default PhotoPage;

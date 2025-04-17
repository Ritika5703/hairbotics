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

  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        console.log("✅ Model loaded successfully");
      } catch (error) {
        console.error("❌ Failed to load model:", error);
        alert(
          "Failed to load image classification model. Please refresh the page."
        );
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, []);

  const classifyImage = async (file: File) => {
    if (!model || !user?.id) return;

    try {
      setLoading(true); // Start loading state

      // Create an image from the file
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      img.src = imageUrl;

      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Failed to load image"));
      });
      // Classify the image
      const prediction = await model.predict(img);
      setPredictions(prediction);

      // Find the top prediction
      const topPrediction = prediction.reduce((prev, curr) =>
        curr.probability > prev.probability ? curr : prev
      );

      // Save to backend
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
      alert("Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!loading) {
      console.log("Loading finished, removing blur effect");
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col items-center justify-center relative">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-lg font-semibold">
              {model ? "Analyzing image..." : "Loading model..."}
            </span>
          </div>
        </div>
      )}
      <div className={loading ? "opacity-50 pointer-events-none" : ""}>
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
    </div>
  );
};

export default PhotoPage;

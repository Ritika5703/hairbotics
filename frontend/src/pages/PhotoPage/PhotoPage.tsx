import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import CameraCapturePage from "./CameraCapture";
import ImageUploader from "./ImageUploader";
import axios from "axios";

const PhotoPage: React.FC = () => {
  const [isCameraView, setIsCameraView] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any | null>(null);
  const [model, setModel] = useState<any | null>(null);
  const modelURL =
    "https://teachablemachine.withgoogle.com/models/655WLkBQN//model.json";
  const metadataURL =
    "https://teachablemachine.withgoogle.com/models/655WLkBQN//metadata.json";

  useEffect(() => {
    // Load the Teachable Machine model
    const loadModel = async () => {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const classifyImage = async (file: File) => {
    if (!model) return;

    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);

    image.onload = async () => {
      const prediction = await model.predict(image);
      setPredictions(prediction);

      // Prepare data for API request
      const predictionData = prediction.map((pred: any) => ({
        className: pred.className,
        probability: pred.probability,
      }));

      // Send results to the backend
      try {
        const response = await axios.post(
          "http://localhost:5000/api/classifications/classify",
          {
            imageSrc, // Optional: You can send the imageSrc if needed
            predictions: predictionData,
          }
        );

        console.log("Data successfully sent to the backend:", response.data);
      } catch (error) {
        console.error("Error sending data to the backend:", error);
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

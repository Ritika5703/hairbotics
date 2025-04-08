import React, { useState } from "react";
import { alibaba, amazon, jumia } from "../../assets/index";
import styles from "../../styles/ImageUploaderStyles";
import UpgradeCard from "../UpgradeCard";

interface Prediction {
  className: string;
  probability: number;
}

interface ImageUploaderProps {
  imageSrc: string | null;
  setImageSrc: (src: string | null) => void;
  predictions: Prediction[] | null;
  classifyImage: (file: File) => Promise<void>;
  setIsCameraView: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageSrc,
  setImageSrc,
  predictions,
  classifyImage,
  setIsCameraView,
}) => {
  const [showModel, setShowModel] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null);
  const [credits, setCredits] = useState(150);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (file: File) => {
    if (credits < 1) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const result = reader.result as string;
      setImageSrc(result);
      setIsLoading(true);
      await classifyImage(file);
      setCredits((prev) => Math.max(prev - 25, 0));
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleInputClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleRetry = () => {
    setImageSrc(null);
  };

  const handleBuyHairProducts = () => {
    if (predictions && predictions.length > 0) {
      const topPrediction = predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      const product = encodeURIComponent(
        topPrediction.className + " hair products"
      );
      setSelectedWebsite(product);
      setShowModel(true);
    } else {
      alert("No predictions available to search for products.");
    }
  };

  const handleWebsiteClick = (website: string) => {
    if (!selectedWebsite) return;
    let url = "";

    switch (website) {
      case "Amazon":
        url = `https://www.amazon.com/s?k=${selectedWebsite}`;
        break;
      case "Alibaba":
        url = `https://www.alibaba.com/trade/search?fsb=y&SearchText=${selectedWebsite}`;
        break;
      case "Jumia":
        url = `https://www.jumia.com.ng/catalog/?q=${selectedWebsite}`;
        break;
    }

    window.open(url, "_blank");
    setShowModel(false);
  };

  return (
    <div className={styles.container}>
      {credits < 1 ? (
        <UpgradeCard />
      ) : (
        <>
          <div className="flex flex-col items-center">
            {imageSrc ? (
              <img src={imageSrc} alt="Uploaded" className={styles.image} />
            ) : (
              <img
                src="https://via.placeholder.com/200"
                alt="Placeholder"
                className={styles.image}
              />
            )}
            <h2 className={styles.title}>Upload or Capture an Image</h2>
            <p className={styles.description}>
              We'll analyze your image and return AI-based predictions
            </p>
            <p className={styles.credits}>Credits: {credits}</p>

            <div className="space-x-4 mt-4">
              <button
                className={styles.button}
                onClick={() => {
                  setIsCameraView(true);
                  setCredits((prev) => Math.max(prev - 25, 0));
                }}
              >
                Use Camera
              </button>

              <div className="relative inline-block">
                <input
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileChange(file);
                  }}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className={styles.button} onClick={handleInputClick}>
                  Choose from Library
                </button>
              </div>

              <button
                className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-600"
                onClick={handleRetry}
              >
                Retry
              </button>
            </div>
          </div>

          {isLoading && (
            <p className="mt-4 text-blue-500">Analyzing image...</p>
          )}

          {predictions && (
            <div className={styles.analysisContainer}>
              <h3 className={styles.analysisTitle}>Analysis Results</h3>
              <ul>
                {predictions.map((concept, index) => (
                  <li key={index} className={styles.analysisItem}>
                    {concept.className}: {Math.round(concept.probability * 100)}
                    %
                  </li>
                ))}
              </ul>

              {/* Confidence Message */}
              {Math.max(...predictions.map((p) => p.probability)) < 0.6 && (
                <p className="text-yellow-500 mt-2">
                  Confidence is low. Try a clearer or better-lit image.
                </p>
              )}

              <button
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleBuyHairProducts}
              >
                Buy Hair Products
              </button>
            </div>
          )}

          {showModel && (
            <div className={styles.modalContainer}>
              <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Choose a Website</h3>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleWebsiteClick("Amazon")}
                    className={styles.websiteButton}
                  >
                    <img src={amazon} alt="Amazon" className="w-6 h-6 mr-2" />
                    <span>Amazon</span>
                  </button>
                  <button
                    onClick={() => handleWebsiteClick("Alibaba")}
                    className={styles.websiteButton}
                  >
                    <img src={alibaba} alt="Alibaba" className="w-6 h-6 mr-2" />
                    <span>Alibaba</span>
                  </button>
                  <button
                    onClick={() => handleWebsiteClick("Jumia")}
                    className={styles.websiteButton}
                  >
                    <img src={jumia} alt="Jumia" className="w-6 h-6 mr-2" />
                    <span>Jumia</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageUploader;

import React, { useState, useEffect } from "react";
import { alibaba, amazon, jumia } from "../../assets/index";
import styles from "../../styles/ImageUploaderStyles";
import UpgradeCard from "../UpgradeCard";
import { useUser } from "@clerk/clerk-react";
import axiosInstance from "../../api/axiosInstance";

interface Prediction {
  className: string;
  probability: number;
}
interface Suggestion {
  condition: string;
  description: string;
  tips: string[];
  products: string[];
}

interface ImageUploaderProps {
  imageSrc: string | null;
  setImageSrc: (src: string | null) => void;
  predictions: Prediction[] | null;
  suggestions: Suggestion | null;
  classifyImage: (file: File) => Promise<void>;
  setIsCameraView: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageSrc,
  setImageSrc,
  predictions,
  suggestions,
  classifyImage,
  setIsCameraView,
  setIsLoading,
}) => {
  const [showModel, setShowModel] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null);
  const [credits, setCredits] = useState(150);
  const { user } = useUser();

  const handleFileChange = async (file: File) => {
    if (!user) return;
    // Set loading state in parent component
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/api/users/deduct-credits", {
        clerkId: user.id,
      });

      if (res.data.credits < 1) {
        setCredits(0);
        setIsLoading(false);
        return;
      }

      setCredits(res.data.credits);

      // Process the image file
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        setImageSrc(result);

        // The classifyImage function will manage its own loading state
        await classifyImage(file);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Credit deduction failed", error);
      setIsLoading(false);
    }
  };

  const handleInputClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleRetry = () => {
    setImageSrc(null);
    setShowModel(false);
  };

  const handleBuyHairProducts = () => {
    if (suggestions) {
      // Use the suggested condition to search for products
      const productSearch = encodeURIComponent(
        suggestions.condition + " hair products"
      );
      setSelectedWebsite(productSearch);
      setShowModel(true);
    } else if (predictions && predictions.length > 0) {
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

  useEffect(() => {
    const fetchCredits = async () => {
      if (!user) return;
      const res = await axiosInstance.post("/api/users/get-credits", {
        clerkId: user.id,
      });
      setCredits(res.data.credits);
    };
    fetchCredits();
  }, [user]);

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
                src="https://www.marionstate.bank/wp-content/uploads/2024/02/AdobeStock_517535712-scaled.jpeg"
                alt="Placeholder"
                className={styles.image}
              />
            )}
            <h2 className={styles.title}>Hair Analysis Tool</h2>
            <p className={styles.description}>
              Upload or capture an image of your hair for AI-powered analysis
              and care recommendations
            </p>
            <p className={styles.credits}>Credits: {credits}</p>

            <div className="space-x-4 mt-4">
              <button
                disabled={credits < 25}
                className={`${styles.button} ${
                  credits < 25 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  setIsCameraView(true);
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

          {/* Analysis Results Section */}
          {predictions && (
            <div className={styles.analysisContainer}>
              <h3 className={styles.analysisTitle}>Hair Analysis Results</h3>
              <ul>
                {predictions.map((concept, index) => (
                  <li key={index} className={styles.analysisItem}>
                    {concept.className}: {Math.round(concept.probability * 100)}
                    %
                  </li>
                ))}
              </ul>

              {Math.max(...predictions.map((p) => p.probability)) < 0.6 && (
                <p className="text-yellow-500 mt-2">
                  Confidence is low. Try a clearer or better-lit image.
                </p>
              )}
            </div>
          )}

          {/* Hair Suggestions Section */}
          {suggestions && (
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="font-bold text-blue-800 text-lg">
                  {suggestions.condition}
                </h3>
              </div>

              <p className="text-gray-700 mb-4">{suggestions.description}</p>

              <div className="mb-4">
                <h4 className="font-semibold text-blue-700 mb-2">
                  Recommended Care Tips:
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {suggestions.tips.map((tip, idx) => (
                    <li key={idx} className="text-gray-700">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-2">
                  Suggested Products:
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {suggestions.products.map((product, idx) => (
                    <li key={idx} className="text-gray-700">
                      {product}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                onClick={handleBuyHairProducts}
              >
                Shop For Recommended Products
              </button>
            </div>
          )}

          {/* Buy Products Button (Only show if suggestions aren't shown) */}
          {predictions && !suggestions && (
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleBuyHairProducts}
            >
              Buy Hair Products
            </button>
          )}

          {/* Shopping Website Modal */}
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

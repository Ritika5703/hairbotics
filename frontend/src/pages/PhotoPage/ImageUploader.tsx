import React, { useState, useEffect } from "react";
import { alibaba, amazon, jumia } from "../../assets/index";
import { useUser } from "@clerk/clerk-react";
import axiosInstance from "../../api/axiosInstance";
import {
  Microscope,
  CameraIcon,
  Upload,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

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

      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        setImageSrc(result);
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

  // Updated handleRetry function to reset all analysis data
  const handleRetry = () => {
    setImageSrc(null);
    setShowModel(false);
    // We need to call a function in the parent component to reset predictions and suggestions
    // Since they're passed as props, we can't directly modify them here
    // Let's add a custom event to notify the parent component
    const event = new CustomEvent("resetAnalysis");
    window.dispatchEvent(event);
  };

  const handleBuyHairProducts = () => {
    if (suggestions) {
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
    <div className="max-w-4xl w-full mx-auto p-6">
      {credits < 1 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Upgrade Your Plan
          </h2>
          <p className="text-gray-600 text-center mb-8">
            You've used all your available credits. Upgrade now to continue
            analyzing your hair.
          </p>
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
              Upgrade Now
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden mb-6 border-4 border-white shadow-xl w-full max-w-lg aspect-square bg-gradient-to-br from-blue-50 to-purple-50">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Uploaded Hair"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <Microscope size={64} className="text-blue-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700">
                    Upload or capture an image
                  </h3>
                  <p className="text-gray-500 mt-2">
                    For AI-powered hair analysis
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 w-full">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Hair Analysis Tool
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Get personalized hair care recommendations based on AI analysis
              </p>

              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center">
                  <span className="text-blue-500 font-medium mr-2">
                    Credits:
                  </span>
                  <span className="bg-blue-500 text-white rounded-full px-3 py-1">
                    {credits}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button
                  disabled={credits < 25}
                  className={`flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 ${
                    credits < 25
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:translate-y-1"
                  }`}
                  onClick={() => {
                    setIsCameraView(true);
                  }}
                >
                  <CameraIcon size={20} className="mr-2" />
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
                  <button
                    className="flex items-center bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:translate-y-1"
                    onClick={handleInputClick}
                  >
                    <Upload size={20} className="mr-2" />
                    Choose Image
                  </button>
                </div>

                <button
                  className="flex items-center bg-gradient-to-r from-red-400 to-red-500 text-white px-5 py-3 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:translate-y-1"
                  onClick={handleRetry}
                >
                  <RefreshCw size={20} className="mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Results Section - Only show if imageSrc exists */}
          {imageSrc && predictions && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Hair Analysis Results
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  AI Powered
                </span>
              </div>

              <div className="space-y-3">
                {predictions.map((concept, index) => {
                  const percentage = Math.round(concept.probability * 100);
                  return (
                    <div key={index} className="relative pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {concept.className}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {percentage}%
                        </span>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${percentage}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            percentage > 70
                              ? "bg-green-500"
                              : percentage > 40
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {Math.max(...predictions.map((p) => p.probability)) < 0.6 && (
                <div className="flex items-center mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <svg
                    className="w-5 h-5 text-yellow-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-yellow-700">
                    Confidence is low. Try a clearer or better-lit image for
                    more accurate results.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Hair Suggestions Section - Only show if imageSrc exists */}
          {imageSrc && suggestions && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {suggestions.condition}
                </h3>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {suggestions.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Care Tips
                  </h4>
                  <ul className="space-y-2">
                    {suggestions.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-200 text-blue-600 text-xs font-medium mr-2 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      ></path>
                    </svg>
                    Recommended Products
                  </h4>
                  <ul className="space-y-2">
                    {suggestions.products.map((product, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-200 text-purple-600 text-xs font-medium mr-2 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg w-full flex items-center justify-center font-medium transition-all duration-300 hover:translate-y-1"
                onClick={handleBuyHairProducts}
              >
                <ShoppingBag size={20} className="mr-2" />
                Shop For Recommended Products
              </button>
            </div>
          )}

          {/* Buy Products Button (Only show if predictions aren't shown and image exists) */}
          {imageSrc && predictions && !suggestions && (
            <div className="text-center">
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg flex items-center mx-auto transition-all duration-300 hover:translate-y-1"
                onClick={handleBuyHairProducts}
              >
                <ShoppingBag size={20} className="mr-2" />
                Buy Hair Products
              </button>
            </div>
          )}

          {/* Shopping Website Modal */}
          {showModel && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-fade-in-up">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Choose a Shopping Platform
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Select where you'd like to browse products for{" "}
                  {selectedWebsite?.split("+").join(" ")}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleWebsiteClick("Amazon")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <img src={amazon} alt="Amazon" className="w-8 h-8 mr-3" />
                      <span>Amazon</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleWebsiteClick("Alibaba")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <img
                        src={alibaba}
                        alt="Alibaba"
                        className="w-8 h-8 mr-3"
                      />
                      <span>Alibaba</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleWebsiteClick("Jumia")}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <img src={jumia} alt="Jumia" className="w-8 h-8 mr-3" />
                      <span>Jumia</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <button
                    className="text-gray-500 hover:text-gray-700 font-medium"
                    onClick={() => setShowModel(false)}
                  >
                    Cancel
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

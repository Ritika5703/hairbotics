import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";
import CameraCapturePage from "./CameraCapture";
import ImageUploader from "./ImageUploader";
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
const PhotoPage: React.FC = () => {
  const [isCameraView, setIsCameraView] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion | null>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const modelURL =
    "https://teachablemachine.withgoogle.com/models/q-XcmC2jK/model.json";
  const metadataURL =
    "https://teachablemachine.withgoogle.com/models/q-XcmC2jK/metadata.json";

  // Add reset functionality
  const resetAnalysis = () => {
    setImageSrc(null);
    setPredictions(null);
    setSuggestions(null);
  };

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

    // Add event listener for reset
    window.addEventListener("resetAnalysis", resetAnalysis);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resetAnalysis", resetAnalysis);
    };
  }, []);

  // Hair analysis suggestions database
  const hairSuggestionDatabase: Record<string, Suggestion> = {
    healthy_hair: {
      condition: "Healthy Hair",
      description:
        "Your hair appears to be in good condition with proper shine, volume, and strength.",
      tips: [
        "Continue with your current hair care routine",
        "Use heat protectant when styling with hot tools",
        "Trim ends every 8-12 weeks to maintain health",
      ],
      products: [
        "Hydrating shampoo and conditioner",
        "Weekly hair mask for maintenance",
        "Leave-in heat protectant",
      ],
    },
    thinning_hair: {
      condition: "Thinning Hair",
      description:
        "Your hair shows signs of thinning or hair loss which may benefit from specialized care.",
      tips: [
        "Be gentle when brushing to minimize breakage",
        "Consider a protein-rich diet with biotin supplements",
        "Avoid tight hairstyles that pull on the hair follicles",
        "Use volumizing styling techniques",
      ],
      products: [
        "Hair growth stimulating shampoo",
        "Thickening conditioner with keratin",
        "Scalp treatments with minoxidil",
        "Volumizing mousse or spray",
      ],
    },
    greasy_hair: {
      condition: "Oily/Greasy Hair",
      description:
        "Your hair shows excess oil production which can make it appear flat and unwashed.",
      tips: [
        "Wash hair with lukewarm water, not hot",
        "Focus shampoo on the scalp, conditioner on ends only",
        "Avoid touching your hair frequently throughout the day",
        "Consider washing hair more frequently with gentle shampoo",
      ],
      products: [
        "Clarifying shampoo for oily hair",
        "Lightweight conditioner for ends only",
        "Oil-absorbing dry shampoo",
        "Scalp toner with astringent properties",
      ],
    },
    dandruff_hair: {
      condition: "Dandruff",
      description:
        "Your hair shows signs of dandruff or scalp flaking that requires targeted treatment.",
      tips: [
        "Wash hair regularly with anti-dandruff shampoo",
        "Gently exfoliate scalp weekly to remove buildup",
        "Stay hydrated and consider omega-3 supplements",
        "Avoid scratching which can worsen irritation",
      ],
      products: [
        "Medicated anti-dandruff shampoo with zinc pyrithione or ketoconazole",
        "Tea tree oil scalp treatment",
        "Salicylic acid scalp exfoliator",
        "Soothing scalp serum with aloe",
      ],
    },
    damaged_hair: {
      condition: "Damaged Hair",
      description:
        "Your hair shows signs of damage such as split ends, breakage, or dryness.",
      tips: [
        "Minimize heat styling and chemical treatments",
        "Use deep conditioning treatments weekly",
        "Get regular trims to remove split ends",
        "Sleep on a silk pillowcase to reduce friction",
      ],
      products: [
        "Protein-rich reconstructing shampoo",
        "Deep conditioning hair mask",
        "Bond repair treatment",
        "Leave-in conditioner with oils",
      ],
    },
    default: {
      condition: "Hair Analysis",
      description:
        "We've analyzed your hair but couldn't determine a specific condition.",
      tips: [
        "Keep hair clean with regular washing",
        "Use conditioner appropriate for your hair type",
        "Protect hair from sun and environmental damage",
        "Consider consulting with a dermatologist for personalized advice",
      ],
      products: [
        "Gentle sulfate-free shampoo",
        "Hydrating conditioner",
        "Leave-in conditioner or hair oil",
        "Heat protectant spray",
      ],
    },
  };
  const generateHairSuggestions = (label: string): Suggestion => {
    // Process the label to match our database keys
    const normalizedLabel = label.toLowerCase().trim().replace(/\s+/g, "_");

    // Direct match
    if (hairSuggestionDatabase[normalizedLabel]) {
      return hairSuggestionDatabase[normalizedLabel];
    }

    // Partial match
    for (const key in hairSuggestionDatabase) {
      if (
        key !== "default" &&
        (normalizedLabel.includes(key) || key.includes(normalizedLabel))
      ) {
        return hairSuggestionDatabase[key];
      }
    }

    // Check for specific keywords in the label
    if (
      normalizedLabel.includes("thin") ||
      normalizedLabel.includes("bald") ||
      normalizedLabel.includes("loss")
    ) {
      return hairSuggestionDatabase.thinning_hair;
    } else if (
      normalizedLabel.includes("oil") ||
      normalizedLabel.includes("greas")
    ) {
      return hairSuggestionDatabase.greasy_hair;
    } else if (
      normalizedLabel.includes("dandruff") ||
      normalizedLabel.includes("flak") ||
      normalizedLabel.includes("scal")
    ) {
      return hairSuggestionDatabase.dandruff_hair;
    } else if (
      normalizedLabel.includes("damag") ||
      normalizedLabel.includes("dry") ||
      normalizedLabel.includes("split")
    ) {
      return hairSuggestionDatabase.damaged_hair;
    } else if (
      normalizedLabel.includes("health") ||
      normalizedLabel.includes("good") ||
      normalizedLabel.includes("shin")
    ) {
      return hairSuggestionDatabase.healthy_hair;
    }

    // Return default suggestions if no match found
    return hairSuggestionDatabase.default;
  };

  const classifyImage = async (file: File) => {
    if (!model || !user?.id) return;

    try {
      setLoading(true); // Start loading state
      setSuggestions(null); // Clear previous suggestions
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") resolve(reader.result);
          else reject(new Error("Failed to convert image to base64"));
        };
        reader.readAsDataURL(file);
      });
      // Create an image from the file
      const img = new Image();
      // const imageUrl = URL.createObjectURL(file);
      img.src = imageBase64;

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
      // Generate hair-specific suggestions based on the top prediction
      const hairSuggestions = generateHairSuggestions(topPrediction.className);
      setSuggestions(hairSuggestions);
      // Save to backend
      await axiosInstance.post("/api/images/classify", {
        userId: user.id,
        imageUrl: img.src,
        prediction: {
          label: topPrediction.className,
          confidence: Math.round(topPrediction.probability * 100),
        },
        suggestions: hairSuggestions, // Save hair analysis suggestions
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
            suggestions={suggestions}
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

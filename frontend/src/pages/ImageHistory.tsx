import React from "react";
import { useNavigate } from "react-router-dom";

interface HistoryItem {
  id: string;
  image: string;
  prediction: string;
  confidence: number;
  timestamp: string;
}

interface ImageHistoryProps {
  history: HistoryItem[];
}

const ImageHistory: React.FC<ImageHistoryProps> = ({ history }) => {
  const navigate = useNavigate();

  const reAnalyze = (item: HistoryItem) => {
    navigate("/dashboard/analysis", { state: { image: item.image } });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📸 Image History</h2>

      {history.length === 0 ? (
        <p className="text-gray-500">No image history available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-3 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt="History"
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 text-sm text-gray-600">
                Prediction: <b>{item.prediction}</b>
              </p>
              <p className="text-sm text-gray-500">
                Confidence: {item.confidence}%
              </p>
              {item.confidence < 60 && (
                <p className="text-xs text-yellow-600">
                  ⚠️ Confidence is low, try a clearer image.
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">{item.timestamp}</p>
              <button
                onClick={() => reAnalyze(item)}
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 rounded"
              >
                🔄 Re-analyze
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageHistory;

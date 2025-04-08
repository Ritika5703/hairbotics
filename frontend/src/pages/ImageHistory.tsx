import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

interface HistoryItem {
  _id: string;
  imageUrl: string;
  prediction: {
    label: string;
    confidence: number;
  };
  timestamp: string;
}

const ImageHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch user image history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/images/user/${user?.id}`
        );
        setHistory(res.data);
      } catch (error) {
        console.error("❌ Error fetching history:", error);
      }
    };

    if (user?.id) fetchHistory();
  }, [user]);

  // Re-analyze button click
  const reAnalyze = (item: HistoryItem) => {
    navigate("/dashboard/analysis", { state: { image: item.imageUrl } });
  };

  // Delete button click
  const deleteImage = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("❌ Error deleting image:", error);
    }
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
              key={item._id}
              className="bg-white rounded-lg shadow p-3 hover:shadow-md transition"
            >
              <img
                src={item.imageUrl}
                alt="History"
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 text-sm text-gray-600">
                Prediction: <b>{item.prediction.label}</b>
              </p>
              <p className="text-sm text-gray-500">
                Confidence: {item.prediction.confidence}%
              </p>
              {item.prediction.confidence < 60 && (
                <p className="text-xs text-yellow-600">
                  ⚠️ Confidence is low, try a clearer image.
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(item.timestamp).toLocaleString()}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => reAnalyze(item)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 rounded"
                >
                  🔄 Re-analyze
                </button>
                <button
                  onClick={() => deleteImage(item._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageHistory;

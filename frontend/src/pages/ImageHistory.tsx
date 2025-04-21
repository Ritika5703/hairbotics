import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axiosInstance from "../api/axiosInstance";
import { useImage, cleanupBlobUrl } from "../utils/imageHelper.ts";

interface HistoryItem {
  _id: string;
  imageUrl: string;
  prediction: {
    label: string;
    confidence: number;
  };
  suggestions?: {
    condition: string;
    description: string;
    tips: string[];
    products: string[];
  };
  timestamp: string;
}

interface HistoryImageProps {
  url: string;
  alt?: string;
  className?: string;
}

const HistoryImage: React.FC<HistoryImageProps> = ({
  url,
  alt = "Image",
  className = "",
}) => {
  const { loading, error, url: validUrl } = useImage(url);

  if (loading) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
      >
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-gray-50 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img src={validUrl || ""} alt={alt} className={className} loading="lazy" />
  );
};

// Modal component for displaying image analysis details
const AnalysisModal = ({
  item,
  onClose,
}: {
  item: HistoryItem;
  onClose: () => void;
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Hair Analysis Details</h3>
          <button onClick={onClose} className="text-2xl hover:text-gray-600">
            ×
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <HistoryImage
                url={item.imageUrl}
                alt="Analysis"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3">
              <p className="font-bold text-lg">{item.prediction.label}</p>
              <p className="text-sm text-gray-600">
                Confidence: {item.prediction.confidence}%
                <span className="ml-2">
                  {item.prediction.confidence >= 80
                    ? "✅ High"
                    : item.prediction.confidence >= 60
                    ? "⚠️ Medium"
                    : "❌ Low"}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Analyzed on: {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            {item.suggestions ? (
              <>
                <h4 className="font-bold text-lg">
                  {item.suggestions.condition}
                </h4>
                <p className="mb-3 text-sm">{item.suggestions.description}</p>

                <h5 className="font-bold mt-3 mb-1">Recommended Tips:</h5>
                <ul className="list-disc pl-5 text-sm">
                  {item.suggestions.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>

                <h5 className="font-bold mt-3 mb-1">Recommended Products:</h5>
                <ul className="list-disc pl-5 text-sm">
                  {item.suggestions.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500 mb-4 text-center">
                  No detailed analysis available for this image.
                </p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    onClose();
                    // You can add a function here to navigate to reanalysis page
                  }}
                >
                  Reanalyze for detailed results
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 border-t border-green-100 flex justify-end gap-3 bg-gradient-to-r from-green-50 to-green-100">
          <button
            onClick={() => {
              const printWindow = window.open("", "_blank");
              if (printWindow) {
                printWindow.document.write(`
          <html>
            <head>
              <title>Hair Analysis Report</title>
              <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; padding: 30px; color: #374151; background-color: #f0fdf4; }
                img { max-width: 100%; height: auto; border-radius: 8px; }
                h1 { color: #16a34a; text-align: center; font-weight: 600; border-bottom: 2px solid #bbf7d0; padding-bottom: 15px; }
                h2 { color: #15803d; margin-top: 25px; }
                h3 { color: #166534; margin-top: 20px; font-size: 18px; }
                .container { max-width: 800px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 3px 15px rgba(20, 83, 45, 0.1); }
                p { line-height: 1.6; }
                ul { padding-left: 20px; }
                li { margin-bottom: 8px; }
                .report-date { color: #15803d; font-style: italic; }
                .highlight { background-color: #dcfce7; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #22c55e; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Hair Analysis Report</h1>
                <p class="report-date"><strong>Date:</strong> ${new Date(
                  item.timestamp
                ).toLocaleString()}</p>
                <div class="highlight">
                  <p><strong>Condition:</strong> ${item.prediction.label}</p>
                  <p><strong>Confidence:</strong> ${
                    item.prediction.confidence
                  }%</p>
                </div>
                ${
                  item.suggestions
                    ? `
                  <h2>Your Hair Condition: ${item.suggestions.condition}</h2>
                  <p>${item.suggestions.description}</p>
                  <h3>Personalized Recommendations:</h3>
                  <ul>
                    ${item.suggestions.tips
                      .map((tip) => `<li>${tip}</li>`)
                      .join("")}
                  </ul>
                  <h3>Products For Your Hair Type:</h3>
                  <ul>
                    ${item.suggestions.products
                      .map((product) => `<li>${product}</li>`)
                      .join("")}
                  </ul>
                `
                    : ""
                }
              </div>
            </body>
          </html>
        `);
                printWindow.document.close();
                printWindow.print();
              }
            }}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-all duration-300 flex items-center gap-2 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Report
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-all duration-300 flex items-center gap-2 border border-gray-200 shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid
  const { user } = useUser();
  const navigate = useNavigate();

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      history.forEach((item) => {
        if (item.imageUrl && item.imageUrl.startsWith("blob:")) {
          cleanupBlobUrl(item.imageUrl);
        }
      });
    };
  }, [history]);

  // Fetch user image history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get(`/api/images/user/${user?.id}`);
        console.log("API Response:", res.data);

        // Access the images array from res.data
        const imagesArray = res.data.images || [];
        setHistory(imagesArray);
        setError(null);
      } catch (error) {
        console.error("❌ Error fetching history:", error);
        setError("Failed to load image history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) fetchHistory();
  }, [user]);

  // Fetch individual image details when needed
  const fetchImageDetails = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/api/images/${id}`);
      return res.data;
    } catch (error) {
      console.error("❌ Error fetching image details:", error);
      return null;
    }
  };

  // Re-analyze button click
  const reAnalyze = (item: HistoryItem) => {
    navigate("/dashboard/analysis", { state: { image: item.imageUrl } });
  };

  // Delete button click
  const deleteImage = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirm = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/api/images/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (selectedItem?._id === id) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error("❌ Error deleting image:", error);
    }
  };

  // Handle viewing details with potential data fetching
  const handleViewDetails = async (item: HistoryItem) => {
    // If we have suggestions already, just show the modal
    if (item.suggestions) {
      setSelectedItem(item);
      return;
    }

    // Otherwise, try to fetch complete item data first
    try {
      setIsLoading(true);
      const detailedItem = await fetchImageDetails(item._id);
      if (detailedItem) {
        setSelectedItem(detailedItem);
      } else {
        // If fetch fails, use what we have
        setSelectedItem(item);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      setSelectedItem(item);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const currentItems = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const changePage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid when page changes
    document
      .getElementById("history-grid")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📸 Image History</h2>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-lg text-red-700">{error}</div>
      ) : history.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No image history available yet.</p>
          <button
            onClick={() => navigate("/dashboard/analysis")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Analyze Your First Image
          </button>
        </div>
      ) : (
        <>
          <div
            id="history-grid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-3 hover:shadow-md transition"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => handleViewDetails(item)}
                >
                  <div className="relative h-40 w-full overflow-hidden rounded">
                    <HistoryImage
                      url={item.imageUrl}
                      alt="Hair Analysis"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white bg-opacity-75 rounded-full p-2">
                        👁️ View
                      </span>
                    </div>
                  </div>
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
                  <p className="text-xs text-blue-500 mt-1 italic">
                    Click to view detailed analysis
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => reAnalyze(item)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 rounded transition-colors"
                  >
                    🔄 Re-analyze
                  </button>
                  <button
                    onClick={(e) => deleteImage(item._id, e)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1">
                <button
                  onClick={() => changePage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  &laquo;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    changePage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  &raquo;
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {selectedItem && (
        <AnalysisModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default ImageHistory;

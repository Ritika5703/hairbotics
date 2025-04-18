import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCamera,
  FaChartLine,
  FaHistory,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { logo, hair } from "../assets/index";
import SyncUserToDB from "../components/SyncUserToDB";
import axiosInstance from "../api/axiosInstance";

const Dashboard: React.FC = () => {
  const { isSignedIn } = useUser();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleCard = () => setShowCard((prev) => !prev);
  const [credits, setCredits] = useState(150);

  // Handle clicks outside the sidebar on mobile to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        setShowSidebar(false);
      }

      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close sidebar when changing routes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  }, [location.pathname]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          const res = await axiosInstance.get(`/api/users/${user.id}`);
          setCredits(res.data.credits);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user?.id]);

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");
    const maskedUsername =
      username.length > 3 ? `${username.slice(0, 3)}**` : username;
    const maskedDomain = domain
      .split(".")
      .map((part, index) => (index === 0 ? `${part[0]}**` : part))
      .join(".");
    return `${maskedUsername}@${maskedDomain}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Mobile Top Bar */}
      {isSignedIn && <SyncUserToDB />}
      {!isHomePage && (
        <div className="flex lg:hidden justify-between items-center bg-gray-800 text-white px-4 py-3 sticky top-0 z-40">
          <span className="text-xl sm:text-2xl font-bold">Hair Analysis</span>
          <button
            onClick={toggleSidebar}
            className="focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <FaBars className="text-xl sm:text-2xl" />
          </button>
        </div>
      )}

      {/* Main container with proper spacing */}
      <div className="flex-1 flex relative">
        {/* Sidebar */}
        {!isHomePage && (
          <aside
            ref={sidebarRef}
            className={`
              fixed inset-y-0 left-0 w-64 bg-white shadow-md z-50
              transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}
              transition-transform duration-300 ease-in-out
              lg:static lg:translate-x-0 lg:transform-none
              flex flex-col
            `}
          >
            {/* Close button on mobile */}
            <div className="lg:hidden flex justify-end p-4">
              <button
                onClick={toggleSidebar}
                aria-label="Close menu"
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FaTimes className="text-xl text-gray-800" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center py-4 mb-6 px-4">
              <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold text-gray-800 ml-3"
              >
                Hair Analysis
              </Link>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 sm:space-y-4 flex-1 px-4">
              <Link
                to="/dashboard/analysis"
                className={`flex items-center py-2 sm:py-2.5 px-3 sm:px-4 rounded transition-colors duration-200 text-gray-700 hover:bg-green-100 hover:text-gray-900 ${
                  location.pathname === "/dashboard/analysis"
                    ? "bg-green-100 text-gray-900"
                    : ""
                }`}
                onClick={() =>
                  window.innerWidth < 1024 && setShowSidebar(false)
                }
              >
                <FaChartLine className="mr-3 text-gray-600" />
                <span className="text-sm sm:text-base font-medium">
                  Hairbotics
                </span>
              </Link>
              <Link
                to="/dashboard/photo"
                className={`flex items-center py-2 sm:py-2.5 px-3 sm:px-4 rounded transition-colors duration-200 text-gray-700 hover:bg-green-100 hover:text-gray-900 ${
                  location.pathname === "/dashboard/photo"
                    ? "bg-green-100 text-gray-900"
                    : ""
                }`}
                onClick={() =>
                  window.innerWidth < 1024 && setShowSidebar(false)
                }
              >
                <FaCamera className="mr-3 text-gray-600" />
                <span className="text-sm sm:text-base font-medium">
                  Take Photo
                </span>
              </Link>
              <Link
                to="/dashboard/history"
                className={`flex items-center py-2 sm:py-2.5 px-3 sm:px-4 rounded transition-colors duration-200 text-gray-700 hover:bg-green-100 hover:text-gray-900 ${
                  location.pathname === "/dashboard/history"
                    ? "bg-green-100 text-gray-900"
                    : ""
                }`}
                onClick={() =>
                  window.innerWidth < 1024 && setShowSidebar(false)
                }
              >
                <FaHistory className="mr-3 text-gray-600" />
                <span className="text-sm sm:text-base font-medium">
                  Image History
                </span>
              </Link>
            </nav>

            {/* User Info */}
            <div className="mt-auto border-t border-gray-300 p-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Credits: {credits}
              </p>
              <div className="flex items-center" onClick={toggleCard}>
                <div className="cursor-pointer">
                  <img
                    src={user?.profileImageUrl || user?.imageUrl || hair}
                    alt="User Avatar"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.fullName || "User Name"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {maskEmail(
                      user?.primaryEmailAddress?.emailAddress ||
                        "user@example.com"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* User Card */}
            {showCard && user && (
              <div
                ref={cardRef}
                className="absolute right-4 bottom-20 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-50 w-56"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={user?.profileImageUrl || user?.imageUrl || hair}
                    alt="User Avatar"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 mr-2"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {user.fullName || "User Name"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.primaryEmailAddress?.emailAddress ||
                        "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Main Content with optimized spacing for large screens */}
        <div
          className={`flex-1 p-1 md:p-4 ${
            showSidebar && window.innerWidth < 1024 ? "opacity-50" : ""
          }`}
        >
          <div className="h-full w-full">
            <Outlet />
          </div>
        </div>

        {/* Overlay when sidebar is open on mobile */}
        {showSidebar && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

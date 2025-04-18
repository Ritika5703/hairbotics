import React from "react";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { prof, tube1, tube2, tube4, tube5 } from "../assets/index";

const AnalysisPage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/dashboard/photo");
  };

  // Custom media query classNames for larger screens
  const containerClasses =
    "min-h-screen flex items-center justify-center bg-white relative overflow-hidden";

  // Background elements with responsive sizing
  const backgroundCircleClasses = {
    main: "absolute inset-0 flex items-center justify-center z-0",
    circle1:
      "w-40 h-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 sm:h-52 md:h-64 lg:h-80 xl:h-96 rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 blur-md sm:blur-lg lg:blur-xl opacity-70 animate-pulse",
    circle2:
      "w-32 h-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 sm:h-40 md:h-48 lg:h-64 xl:h-80 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-indigo-500 blur-sm sm:blur-md lg:blur-lg opacity-70 animate-pulse delay-700",
  };

  return (
    <div className={containerClasses}>
      {/* Background elements */}
      <div className={backgroundCircleClasses.main}>
        <div className={backgroundCircleClasses.circle1}></div>
        <div className={backgroundCircleClasses.circle2}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-4 px-2">
        {/* Decorative elements */}
        <img
          src={tube1}
          alt="Test tube 1"
          className="absolute hidden sm:block top-2 left-2 w-12 h-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 sm:h-16 md:h-20 lg:h-24 xl:h-28 opacity-90 animate-float"
        />
        <img
          src={tube2}
          alt="Test tube 2"
          className="absolute hidden sm:block top-2 right-2 w-12 h-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 sm:h-16 md:h-20 lg:h-24 xl:h-28 opacity-90 animate-float animation-delay-300"
        />
        <img
          src={tube4}
          alt="Test tube 3"
          className="absolute hidden sm:block bottom-8 left-2 w-10 h-10 sm:w-16 md:w-20 lg:w-24 xl:w-28 sm:h-16 md:h-20 lg:h-24 xl:h-28 opacity-90 animate-float animation-delay-600"
        />
        <img
          src={tube5}
          alt="Test tube 4"
          className="absolute hidden sm:block bottom-8 right-2 w-10 h-10 sm:w-16 md:w-20 lg:w-24 xl:w-28 sm:h-16 md:h-20 lg:h-24 xl:h-28 opacity-90 animate-float animation-delay-900"
        />

        {/* Scientist Image with Tilt Effect */}
        <div className="w-full max-w-xs">
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.03}
            transitionSpeed={1500}
            tiltReverse={true}
          >
            <img
              src={prof}
              alt="Scientist"
              className="w-32 h-auto sm:w-36 md:w-40 lg:w-48 xl:w-56 mx-auto relative z-20"
            />
          </Tilt>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Hair Analysis AI
        </h1>

        {/* Description - more compact for large screens */}
        <p className="text-sm sm:text-base text-gray-600 max-w-md">
          Upload your hair photo and get an AI-powered analysis of your hair
          type and recommended products.
        </p>

        {/* Start Button */}
        <button
          onClick={handleButtonClick}
          className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-bold hover:bg-green-700 focus:outline-none transition-all duration-300 z-30 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Start Analysis
        </button>
      </div>
    </div>
  );
};

export default AnalysisPage;

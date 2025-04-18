const AnalysisPageStyles = {
  // Main container
  container:
    "min-h-screen flex items-center justify-center bg-white relative overflow-hidden",

  // Background elements
  backgroundCircles: "absolute inset-0 flex items-center justify-center z-0",
  circle1:
    "w-40 h-40 sm:w-52 md:w-64 lg:w-80 sm:h-52 md:h-64 lg:h-80 rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 blur-md sm:blur-lg lg:blur-xl opacity-70 animate-pulse",
  circle2:
    "w-32 h-32 sm:w-40 md:w-48 lg:w-64 sm:h-40 md:h-48 lg:h-64 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-indigo-500 blur-sm sm:blur-md lg:blur-lg opacity-70 animate-pulse delay-700",

  // Content container
  content:
    "relative z-10 flex flex-col items-center space-y-4 sm:space-y-6 px-4 text-center",

  // Decorative elements
  tube1:
    "absolute hidden sm:block top-4 left-4 xs:left-2 w-12 h-12 sm:w-16 md:w-20 lg:w-28 sm:h-16 md:h-20 lg:h-28 opacity-90 animate-float",
  tube2:
    "absolute hidden sm:block top-4 right-4 xs:right-2 w-12 h-12 sm:w-16 md:w-20 lg:w-28 sm:h-16 md:h-20 lg:h-28 opacity-90 animate-float animation-delay-300",
  tube3:
    "absolute hidden sm:block bottom-12 xs:bottom-10 left-4 xs:left-2 w-10 h-10 sm:w-16 md:w-20 lg:w-28 sm:h-16 md:h-20 lg:h-28 opacity-90 animate-float animation-delay-600",
  tube4:
    "absolute hidden sm:block bottom-12 xs:bottom-10 right-4 xs:right-2 w-10 h-10 sm:w-16 md:w-20 lg:w-28 sm:h-16 md:h-20 lg:h-28 opacity-90 animate-float animation-delay-900",

  // Scientist image
  scientistImage: "w-36 h-auto sm:w-44 md:w-52 lg:w-64 mx-auto relative z-20",

  // Button
  startButton:
    "bg-green-600 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl font-bold hover:bg-green-700 focus:outline-none transition-all duration-300 z-30 mt-4 shadow-lg hover:shadow-xl transform hover:scale-105",

  // Title & Description (optional)
  title:
    "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mt-2",
  description: "text-sm sm:text-base md:text-lg text-gray-600 max-w-md",
};

export default AnalysisPageStyles;

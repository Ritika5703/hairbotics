const HeroSectionStyles = {
  section:
    "relative flex flex-col-reverse md:flex-row items-center bg-white text-black px-4 sm:px-6 lg:px-20 py-10 md:py-16 2xl:py-8 min-h-[70vh] max-h-[90vh] gap-8 mt-20",

  textContainer:
    "w-full md:w-1/2 z-10 text-center md:text-left space-y-4 animate-fade-in",
  title:
    "text-2xl xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-800",
  description:
    "text-sm xsm:text-base sm:text-lg md:text-xl text-gray-600 max-w-xs xsm:max-w-sm sm:max-w-md mx-auto md:mx-0 leading-relaxed",
  getStartedButton:
    "bg-green-500 text-white px-5 py-2.5 rounded-xl hover:bg-green-600 transition duration-300 ease-in-out shadow-md inline-flex items-center space-x-2 mx-auto md:mx-0",

  // Moved gradientCircle into canvasContainer to ensure it’s behind the 3D model
  canvasContainer:
    "relative w-full md:w-1/2 h-[200px] xsm:h-[240px] sm:h-[280px] md:h-[500px] lg:h-[450px] flex justify-center items-center z-50 mt-10 pb-20",

  gradientCircle: `
      absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 
      blur-3xl opacity-70 animate-gradientMove z-0
    `,
};

// Define animation for gradient movement
const styleElement = document.createElement("style");
styleElement.innerHTML = `
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradientMove {
      background-size: 200% 200%;
      animation: gradientMove 10s ease infinite;
    }
  `;
document.head.appendChild(styleElement);

export default HeroSectionStyles;

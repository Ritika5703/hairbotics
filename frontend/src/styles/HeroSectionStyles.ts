const HeroSectionStyles = {
  section:
    "relative flex flex-col-reverse md:flex-row items-center bg-white text-black px-4 sm:px-6 lg:px-20 py-12 md:py-16 2xl:py-8 min-h-[70vh] max-h-[85vh] gap-8",

  textContainer:
    "w-full md:w-1/2 z-10 text-center md:text-left space-y-6 animate-fade-in",
  title:
    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-800",
  description:
    "text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto md:mx-0 leading-relaxed",
  getStartedButton:
    "bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition duration-300 ease-in-out shadow-md inline-flex items-center space-x-2 mx-auto md:mx-0",

  // Moved gradientCircle into canvasContainer to ensure it’s behind the 3D model
  canvasContainer:
    "relative w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] flex justify-center items-center z-10",

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

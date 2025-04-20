const CompaniesSectionStyles = {
  section:
    "relative py-24 px-6 bg-gradient-to-r from-white via-[#f1f5f9] to-white text-center overflow-hidden",
  title:
    "text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight drop-shadow-sm",
  subtitle: "text-lg text-gray-500 mb-12 max-w-xl mx-auto",

  logoGrid:
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 xl:gap-16 place-items-center",

  logoCard:
    "backdrop-blur-md bg-white/70 shadow-lg rounded-xl p-4 transition-transform border border-white/40",

  logoImg: "h-12 md:h-16 object-contain transition duration-300",

  glowEffect:
    "absolute -top-20 -left-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-30 z-0 animate-pulse",
};

export default CompaniesSectionStyles;

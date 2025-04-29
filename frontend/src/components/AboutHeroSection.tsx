import { motion } from "framer-motion";
import { Link } from "react-router-dom";
type Props = {
  scrollToHowItWorks: () => void;
};
const AboutHero = ({ scrollToHowItWorks }: Props) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative pt-40 md:pt-48 pb-24 md:pb-32 px-6 text-center overflow-hidden">
      {/* Enhanced background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 via-green-500/90 to-green-400/90 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
        style={{ backgroundImage: 'url("/api/placeholder/1920/1080")' }}
      ></div>

      {/* Animated circular shapes for visual interest */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-green-300/20 z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-green-400/30 z-0"></div>

      <motion.div
        className="relative z-20 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Transform Your Hair
          <span className="block mt-2">with AI-Powered Analysis</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="w-24 h-1 bg-white mx-auto mb-8"
        ></motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Discover the perfect haircare routine tailored specifically for you
          through advanced AI technology and expert recommendations.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/dashboard/analysis"
            className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-green-50 transition-all duration-300 inline-block"
          >
            Get Your Analysis
          </Link>
          <button
            onClick={scrollToHowItWorks}
            className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-block"
          >
            Learn How It Works
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutHero;

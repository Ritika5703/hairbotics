import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import HeroImage from "../assets/HeroImage.png";

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.3, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.6 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
      transition: { duration: 0.3 },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingTagVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.8 },
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-white overflow-hidden relative">
      {/* Background decorative elements */}
      {/* <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-50 rounded-bl-full opacity-70 -z-10"></div>
      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-green-100/50 blur-3xl -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-green-300/30 -z-10"></div>
      <div className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-green-200/40 -z-10"></div> */}

      {/* Small decorative lines */}
      <motion.div
        className="hidden md:block absolute top-32 right-1/4 w-16 h-1 bg-green-300/50 rounded-full -z-10"
        animate={{
          rotate: [0, 20, 0],
          transition: { duration: 8, repeat: Infinity },
        }}
      ></motion.div>
      <motion.div
        className="hidden md:block absolute bottom-40 left-1/4 w-12 h-1 bg-green-300/50 rounded-full -z-10"
        animate={{
          rotate: [0, -15, 0],
          transition: { duration: 7, repeat: Infinity },
        }}
      ></motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Text content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.div variants={titleVariants}>
              <span className="inline-block py-1 px-3 text-xs font-semibold text-green-500 bg-green-50 rounded-full mb-4 shadow-sm">
                AI-Powered Hair Analysis
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                We <span className="text-green-500">Focus</span> On{" "}
                <br className="hidden md:block" />
                Fixing Your Hair
              </h1>

              <div className="w-24 h-1 bg-green-500 mb-6 hidden md:block"></div>
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0"
              variants={descriptionVariants}
            >
              Improving your hair so you can get the best results for your hair.
              Also, you get the results quickly with our AI-powered personalized
              hair care solution.
            </motion.p>

            <motion.button
              className="group inline-flex items-center px-6 py-3.5 bg-green-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl"
              variants={buttonVariants}
              whileHover="hover"
            >
              Get Started
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>

          {/* Image */}
          <motion.div
            className="w-full md:w-1/2 relative"
            variants={imageContainerVariants}
          >
            {/* Circle background */}
            <div className="absolute inset-0 w-full h-full rounded-full bg-green-100 -z-10 scale-[0.85]"></div>

            {/* Image */}
            <img
              src={HeroImage}
              alt="Hairbotics AI Hair Analysis"
              className="w-full h-auto rounded-2xl z-10 relative"
            />

            {/* Floating badges */}
            <motion.div
              className="absolute -bottom-5 -left-5 lg:bottom-8 lg:-left-8 bg-white px-4 py-3 rounded-xl shadow-lg z-20"
              variants={floatingTagVariants}
              animate="float"
            >
              <p className="text-sm font-medium text-green-600">
                AI-Powered Analysis
              </p>
            </motion.div>

            <motion.div
              className="absolute -top-5 -right-5 lg:top-8 lg:-right-8 bg-white px-4 py-3 rounded-xl shadow-lg z-20"
              variants={floatingTagVariants}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 4,
                  delay: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              <p className="text-sm font-medium text-green-600">
                Personalized Care Plans
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

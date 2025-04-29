import React from "react";
import { motion } from "framer-motion";
import { alibaba, youtube, amazon, jumia, zawadi } from "../assets/index";

const CompaniesSection = () => {
  const logos = [
    { src: alibaba, alt: "Alibaba" },
    { src: youtube, alt: "YouTube" },
    { src: amazon, alt: "Amazon" },
    { src: jumia, alt: "Jumia" },
    { src: zawadi, alt: "Zawadi" },
  ];

  // Animations
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const logoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 0.6, delay: 0.5 },
    },
  };

  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50 to-white z-10"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Title Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
            variants={titleVariants}
          >
            Trusted by the <span className="text-green-600">Best</span>
          </motion.h2>

          <motion.div
            className="h-1 w-0 bg-green-500 mx-auto mb-6"
            variants={underlineVariants}
          ></motion.div>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Professionals from these top companies use our service to stay
            polished and confident with our AI-powered hair analysis.
          </motion.p>
        </motion.div>

        {/* Logos Section */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 mb-16"
          variants={logoContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.alt}
              className="flex items-center justify-center p-5 rounded-xl bg-white shadow-md border border-gray-100 bg-opacity-90"
              variants={logoVariants}
              whileHover="hover"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 md:h-12 lg:h-14 object-contain transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompaniesSection;

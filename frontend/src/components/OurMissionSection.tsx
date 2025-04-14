import React from "react";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaRobot,
  FaSprayCan,
  FaLeaf,
  FaRegLightbulb,
} from "react-icons/fa";

const OurMission = () => {
  const featureBoxVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-20">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Our Mission to{" "}
              <span className="text-green-600">Revolutionize</span> Hair Care
            </h2>

            <div className="w-20 h-1 bg-green-500 mb-6"></div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Hairbotics, we're committed to transforming the haircare
              industry through innovative AI technology that provides
              personalized, data-driven recommendations for healthier, more
              beautiful hair.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              We believe everyone deserves to understand their unique hair needs
              and have access to customized care routines that deliver real
              results. Our AI-powered analysis bridges the gap between
              professional expertise and everyday haircare.
            </p>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square rounded-full bg-green-100 absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%]"></div>
            <img
              src="/api/placeholder/600/600"
              alt="AI Hair Analysis"
              className="rounded-2xl shadow-2xl relative z-10"
            />
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {/* Feature Box 1 */}
          <motion.div
            variants={featureBoxVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg border border-green-100 group"
          >
            <div className="bg-green-500 text-white p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
              <FaCamera className="text-2xl" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
              Personalized Analysis
            </h3>
            <p className="text-gray-600">
              Our AI performs a comprehensive analysis of your hair type,
              condition, and concerns to create a uniquely tailored care plan.
            </p>
          </motion.div>

          {/* Feature Box 2 */}
          <motion.div
            variants={featureBoxVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg border border-green-100 group"
          >
            <div className="bg-green-500 text-white p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
              <FaRobot className="text-2xl" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
              Advanced AI Technology
            </h3>
            <p className="text-gray-600">
              Powered by state-of-the-art machine learning algorithms that
              continuously improve with each analysis.
            </p>
          </motion.div>

          {/* Feature Box 3 */}
          <motion.div
            variants={featureBoxVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg border border-green-100 group"
          >
            <div className="bg-green-500 text-white p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
              <FaSprayCan className="text-2xl" />
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
              Custom Recommendations
            </h3>
            <p className="text-gray-600">
              Receive personalized product suggestions and care routines
              specifically formulated for your hair's unique needs.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us Section - Enhanced with tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-green-600 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Why Choose Hairbotics?
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-white/20 p-1 rounded-full">
                    <FaRegLightbulb className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">
                      Expert Insights
                    </h4>
                    <p className="text-white/90">
                      Our AI is trained by top trichologists and haircare
                      specialists to provide expert-level analysis.
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="mr-3 mt-1 bg-white/20 p-1 rounded-full">
                    <FaLeaf className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">
                      Sustainable Approach
                    </h4>
                    <p className="text-white/90">
                      We prioritize eco-friendly and cruelty-free product
                      recommendations that are good for your hair and the
                      planet.
                    </p>
                  </div>
                </li>
              </ul>

              <button className="mt-8 bg-white text-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-50 transition-colors">
                Learn More About Our Approach
              </button>
            </div>

            <div className="relative">
              <img
                src="/api/placeholder/800/600"
                alt="Hair Analysis in Action"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;

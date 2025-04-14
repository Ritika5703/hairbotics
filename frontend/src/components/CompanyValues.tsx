import React from "react";
import { motion } from "framer-motion";

const CompanyValues = () => {
  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible in hair analysis technology.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Accuracy",
      description:
        "We deliver precise analysis and recommendations you can trust.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-green-500 to-green-600",
    },
    {
      title: "Accessibility",
      description:
        "We make expert-level hair analysis available to everyone, everywhere.",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The core principles that guide our mission to revolutionize haircare
            with AI technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-shadow`}
            >
              <div
                className={`bg-gradient-to-r ${value.color} p-8 flex items-center justify-center`}
              >
                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
              </div>
              <div className="p-8 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-white p-8 rounded-xl shadow-lg text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Our Commitment
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We're committed to helping people of all hair types achieve their
            healthiest hair through scientific analysis, personalized
            recommendations, and ongoing support. Our AI technology is
            continuously learning and improving to provide you with the most
            accurate and helpful hair analysis available.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyValues;

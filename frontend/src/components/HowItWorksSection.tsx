import { useState } from "react";
import { motion } from "framer-motion";
import step1 from "../assets/step-1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Upload Your Image",
      icon: "📸",
      description:
        "Take a clear photo of your hair or upload an existing one through our easy-to-use interface.",
      details:
        "Our app guides you through the process of capturing the perfect image for analysis. Multiple angles ensure comprehensive results.",
      image: step1,
    },
    {
      title: "AI Analysis",
      icon: "🤖",
      description:
        "Our advanced AI analyzes numerous factors including texture, density, moisture level, and damage.",
      details:
        "Using computer vision and machine learning, we identify over 50 different hair characteristics and conditions in seconds.",
      image: step2,
    },
    {
      title: "Get Tailored Tips",
      icon: "🧴",
      description:
        "Receive a detailed report with personalized product recommendations and care routines.",
      details:
        "Your custom haircare plan includes specific products, ingredients to look for, and a step-by-step care routine.",
      image: step3,
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized haircare recommendations in three simple steps
          </p>
        </motion.div>

        {/* Interactive step display */}
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          {/* Steps navigation */}
          <div className="md:w-1/3">
            <div className="sticky top-24 space-y-3">
              {steps.map((step, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center w-full p-4 rounded-xl transition-all duration-300 ${
                    activeStep === index
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0 shadow">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p
                      className={`text-sm ${
                        activeStep === index ? "text-white/90" : "text-gray-500"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step illustration */}
          <motion.div
            className="md:w-2/3 bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5 },
            }}
            key={activeStep}
          >
            <div className="relative aspect-video bg-gray-100">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {steps[activeStep].title}
                </h3>
                <p>{steps[activeStep].description}</p>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-semibold text-xl text-gray-800 mb-3">
                What happens in this step:
              </h4>
              <p className="text-gray-600">{steps[activeStep].details}</p>

              <div className="mt-8 flex justify-between items-center">
                <button
                  className={`p-3 rounded-full ${
                    activeStep > 0
                      ? "bg-gray-200 text-gray-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    activeStep > 0 && setActiveStep(activeStep - 1)
                  }
                  disabled={activeStep === 0}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="text-gray-500 font-medium">
                  Step {activeStep + 1} of {steps.length}
                </div>

                <button
                  className={`p-3 rounded-full ${
                    activeStep < steps.length - 1
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    activeStep < steps.length - 1 &&
                    setActiveStep(activeStep + 1)
                  }
                  disabled={activeStep === steps.length - 1}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

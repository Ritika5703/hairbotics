import React, { useState } from "react";
import { FaCheckCircle, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

type Plan = {
  name: string;
  amount: number;
  description: string;
  features: string[];
  popular?: boolean;
};

const PaymentPlansSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      amount: isAnnual ? 199 * 10 : 199, // 2 months free with annual
      monthlyAmount: 199,
      description:
        "Ideal for individuals looking to monitor their hair health with occasional analyses.",
      features: [
        "5 AI hair analyses/month",
        "Basic care recommendations",
        "Email support",
      ],
    },
    {
      name: "Premium",
      amount: isAnnual ? 499 * 10 : 499,
      monthlyAmount: 499,
      description:
        "Perfect for users serious about tracking and improving their hair care routine.",
      features: [
        "Unlimited AI hair analyses",
        "Advanced care recommendations",
        "Progress tracking and reports",
        "Priority email support",
      ],
      popular: true,
    },
    {
      name: "Professional",
      amount: isAnnual ? 1199 * 10 : 1199,
      monthlyAmount: 1199,
      description:
        "Designed for salons, trichologists, or professionals managing multiple clients.",
      features: [
        "Unlimited analyses",
        "White-label PDF reports",
        "Client management dashboard",
        "Dedicated account support",
      ],
    },
  ];

  const handleCheckout = async (plan: Plan) => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to load");
      return;
    }

    try {
      const response = await axiosInstance.post("/create-checkout-session", {
        planId: plan.name,
        planAmount: plan.amount,
        planCurrency: "inr",
        isAnnual: isAnnual,
      });

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Failed to retrieve checkout URL.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const switchVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.6 },
    },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0 },
    hover: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-green-50 to-transparent opacity-60"></div>
      <div className="absolute -bottom-40 right-0 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        {/* Header section */}
        <motion.div variants={titleVariants} className="text-center mb-16">
          <span className="inline-block py-1 px-3 text-sm font-medium text-green-600 bg-green-50 rounded-full mb-4">
            Affordable Plans
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Simple, Transparent <span className="text-green-600">Pricing</span>
          </h2>

          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Choose an affordable plan packed with the best features for engaging
            your audience, creating customer loyalty, and driving sales.
          </p>

          {/* Monthly/Annual toggle switch */}
          <motion.div
            className="flex items-center justify-center mb-12"
            variants={switchVariants}
          >
            <span
              className={`text-sm font-medium ${
                !isAnnual ? "text-green-600" : "text-gray-500"
              }`}
            >
              Monthly
            </span>

            <button
              className="relative mx-4 flex items-center w-16 h-8 rounded-full p-1 cursor-pointer"
              onClick={() => setIsAnnual(!isAnnual)}
              style={{
                backgroundColor: isAnnual ? "#22c55e" : "#d1d5db",
              }}
            >
              <motion.div
                className="bg-white w-6 h-6 rounded-full shadow-md"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>

            <div className="flex items-center">
              <span
                className={`text-sm font-medium ${
                  isAnnual ? "text-green-600" : "text-gray-500"
                }`}
              >
                Annual
              </span>

              <div className="relative ml-2 group">
                <FaQuestionCircle className="text-gray-400 hover:text-gray-600 cursor-pointer" />

                <motion.div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded shadow-lg w-32 z-10"
                  initial="hidden"
                  whileHover="hover"
                  variants={tooltipVariants}
                >
                  Save 16% with annual billing
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </motion.div>
              </div>

              {isAnnual && (
                <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                  Save 16%
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Plans container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl shadow-xl p-8 text-center border-2 transition-all duration-300 transform hover:scale-105 ${
                plan.popular
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm font-semibold text-white bg-green-500 px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {plan.name}
              </h4>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">
                ₹{plan.amount}
                <span className="text-base text-gray-500 font-normal">
                  {" "}
                  /{isAnnual ? "year" : "month"}
                </span>
              </p>

              <ul className="text-left text-gray-700 mb-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg transition duration-200 shadow-sm"
                onClick={() => handleCheckout(plan)}
              >
                {plan.name === "Startup" ? "Get Started" : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PaymentPlansSection;

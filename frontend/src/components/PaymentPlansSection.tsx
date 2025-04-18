import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../api/axiosInstance";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPlansSection = () => {
  const plans = [
    {
      name: "Freelancer",
      amount: 1500,
      description:
        "Perfect for solo entrepreneurs or freelancers starting their journey.",
      features: ["1 project slot", "Basic analytics", "Email support"],
    },
    {
      name: "Startup",
      amount: 3000,
      description: "Our most popular plan for small businesses ready to scale.",
      features: [
        "5 project slots",
        "Advanced analytics",
        "Priority email support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      amount: 4800,
      description:
        "Designed for large teams and enterprises with extensive needs.",
      features: [
        "Unlimited project slots",
        "Complete analytics dashboard",
        "24/7 dedicated support",
      ],
    },
  ];

  const handleCheckout = async (plan) => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to load");
      return;
    }

    try {
      const response = await axiosInstance.post("/create-checkout-session", {
        planId: plan.name,
        planAmount: plan.amount,
        planCurrency: "usd",
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

  return (
    <section className="bg-gray-100 py-20 px-6">
      <h3 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-800">
        Pricing plans for teams of all sizes
      </h3>
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
        Choose an affordable plan packed with the best features for engaging
        your audience, creating customer loyalty, and driving sales.
      </p>

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
              ${plan.amount / 100}
              <span className="text-base text-gray-500 font-medium">
                {" "}
                /month
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
    </section>
  );
};

export default PaymentPlansSection;

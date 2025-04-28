import { FaCheckCircle } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
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
  const plans = [
    {
      name: "Basic",
      amount: 199,
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
      amount: 499,
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
      amount: 1199,
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
              ₹{plan.amount}
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

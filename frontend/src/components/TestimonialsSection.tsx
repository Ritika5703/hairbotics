import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Jessica T.",
      location: "Los Angeles, CA",
      quote:
        "The AI analysis was spot on! I've been using the recommended products for only 3 weeks and already see a huge difference in my curly hair's health.",
      rating: 5,
      image: "/api/placeholder/100/100",
    },
    {
      name: "Michael K.",
      location: "Chicago, IL",
      quote:
        "As someone dealing with thinning hair, this app gave me personalized advice that actually worked. My hairline looks noticeably better.",
      rating: 5,
      image: "/api/placeholder/100/100",
    },
    {
      name: "Priya S.",
      location: "New York, NY",
      quote:
        "I was skeptical at first, but the custom routine stopped my excessive hair fall. The AI detected issues my regular stylist missed!",
      rating: 4,
      image: "/api/placeholder/100/100",
    },
    {
      name: "David L.",
      location: "Austin, TX",
      quote:
        "This app helped me understand my hair type better than years of trial and error. The product recommendations were exactly what I needed.",
      rating: 5,
      image: "/api/placeholder/100/100",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Success Stories
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our AI-powered hair analysis has helped people transform
            their hair care routines.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500">{testimonial.location}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  activeIndex === index ? "bg-green-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const stats = [
    { value: "97%", label: "Customer Satisfaction" },
    { value: "3 min", label: "Average Analysis Time" },
    { value: "Free", label: "Basic Hair Report" },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 z-0"></div>
      <div className="absolute inset-0 opacity-10 z-0 bg-[url('/api/placeholder/1920/1080')] bg-center bg-cover"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Ready to Discover Your Perfect Hair Routine?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/90 text-lg mb-8"
            >
              Join thousands of satisfied users who have transformed their hair
              health with our AI-powered analysis and personalized
              recommendations.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center"
                >
                  <span className="text-white text-3xl font-bold">
                    {stat.value}
                  </span>
                  <span className="text-white/80 text-sm">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/dashboard/analysis"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-green-50 transition-all duration-300 flex items-center"
              >
                <span>Get Your Analysis</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              <a
                href="#demo"
                className="bg-transparent text-white border-2 border-white/80 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Watch Demo
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md p-1 rounded-2xl shadow-2xl"
          >
            <div className="bg-white/10 rounded-xl p-6 md:p-8">
              <h3 className="text-white text-2xl font-bold mb-4">
                What our users say
              </h3>

              <div className="space-y-4">
                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                    <div>
                      <h4 className="text-white font-medium">Sarah L.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">
                    "The custom routine fixed my frizzy hair issues in just 2
                    weeks. I'm amazed at how accurate the analysis was!"
                  </p>
                </div>

                <div className="bg-white/20 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                    <div>
                      <h4 className="text-white font-medium">James T.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">
                    "As someone with thinning hair, this app gave me hope. The
                    personalized recommendations have made a visible
                    difference."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

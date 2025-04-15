import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pfp from "../assets/pfp.png";

const Team = () => {
  const teamMembers = [
    {
      name: "Ritika Mishra",
      github: "https://github.com/Ritika5703/",
      linkedin: "https://www.linkedin.com/in/ritikamishra5703/",
      bio: "Pursuing Masters in Computer Application from Thakur Institute of Management Studies, Career Development and Research",
      image: pfp,
    },
    {
      name: "Manisha Mondal",
      github: "https://github.com/kukki1109",
      linkedin: "https://www.linkedin.com/in/manishamondal1109/",
      bio: "Pursuing Masters in Computer Application from Thakur Institute of Management Studies, Career Development and Research",
      image: pfp,
    },
  ];

  return (
    <>
      <Navbar />
      <section className="pt-40 md:pt-48 pb-20 px-6 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet the Team Behind the Project
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              This project is the result of our hard work and dedication as
              students, where we applied our knowledge in AI and tech to create
              a practical solution for hair analysis. From conceptualization to
              development, we've built this innovative tool together as part of
              our academic journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-green-600 transition"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008.07 10.95c.6.11.82-.26.82-.58v-2.1c-3.3.72-4-1.6-4-1.6-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.23.09 1.87 1.27 1.87 1.27 1.08 1.86 2.84 1.32 3.53 1 .11-.8.42-1.32.76-1.63-2.64-.3-5.42-1.32-5.42-5.9 0-1.3.47-2.35 1.24-3.17-.12-.3-.54-1.5.12-3.13 0 0 1-.32 3.3 1.22a11.4 11.4 0 016 0c2.3-1.54 3.3-1.22 3.3-1.22.66 1.63.24 2.83.12 3.13.77.82 1.24 1.87 1.24 3.17 0 4.6-2.78 5.6-5.44 5.9.44.4.84 1.16.84 2.34v3.48c0 .32.22.7.83.58A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                      </svg>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-green-600 transition"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.45 20.45h-3.55v-5.33c0-1.27-.02-2.91-1.77-2.91-1.77 0-2.04 1.38-2.04 2.8v5.44H9.55V9h3.41v1.56h.05c.47-.89 1.61-1.82 3.32-1.82 3.56 0 4.21 2.34 4.21 5.38v6.33zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM6.91 20.45H3.78V9h3.13v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Team;

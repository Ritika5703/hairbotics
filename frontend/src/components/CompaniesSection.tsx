import { alibaba, youtube, amazon, jumia, zawadi } from "../assets/index";
import styles from "../styles/CompaniesSectionStyles";
import { motion } from "framer-motion";

const logos = [
  { src: alibaba, alt: "Alibaba" },
  { src: youtube, alt: "YouTube" },
  { src: amazon, alt: "Amazon" },
  { src: jumia, alt: "Jumia" },
  { src: zawadi, alt: "Zawadi" },
];

const CompaniesSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.glowEffect}></div>
      <h3 className={styles.title}>Trusted by the Best</h3>
      <p className={styles.subtitle}>
        Professionals from these top companies use our service to stay polished
        and confident.
      </p>
      <div className={styles.logoGrid}>
        {logos.map((logo, index) => (
          <motion.div
            key={logo.alt}
            className={styles.logoCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <img src={logo.src} alt={logo.alt} className={styles.logoImg} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CompaniesSection;

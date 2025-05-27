
import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedCars from "@/components/FeaturedCars";
import Testimonials from "@/components/Testimonials";
import DagestanAttractions from "@/components/DagestanAttractions";
import DressCodeInfo from "@/components/DressCodeInfo";
import AdditionalServicesSection from "@/components/AdditionalServicesSection";


const HomePage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="bg-gradient-to-b from-background to-secondary/30 text-foreground">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden"
      >
        <Hero />
      </motion.section>

      <motion.section
        id="features"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <Features />
      </motion.section>
      
      <motion.section
        id="featured-cars"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24 bg-secondary/20"
      >
        <FeaturedCars />
      </motion.section>

      <motion.section
        id="additional-services"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <AdditionalServicesSection />
      </motion.section>

      <motion.section
        id="dagestan-attractions"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24 bg-secondary/20"
      >
        <DagestanAttractions />
      </motion.section>
      
      <motion.section
        id="dress-code"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24 bg-background"
      >
        <DressCodeInfo />
      </motion.section>

      <motion.section
        id="testimonials"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 md:py-24 bg-secondary/20"
      >
        <Testimonials />
      </motion.section>
    </div>
  );
};

export default HomePage;

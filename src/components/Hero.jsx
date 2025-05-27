import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Hero = () => {
  const heroVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 8px 15px hsla(var(--primary), 0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative overflow-hidden hero-section">
      <div className="absolute inset-0 z-0">
        <img  
          className="w-full h-full object-cover opacity-30" 
          alt="Абстрактный зелено-белый фон автомобиля" src="https://images.unsplash.com/photo-1621317629367-61584ff0b0bf" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-background/30 to-primary/60" />
      </div>
      
      <motion.div 
        className="container relative z-10 py-24 md:py-40 text-center"
        variants={heroVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          custom={0}
          variants={textVariants}
          className="inline-flex items-center justify-center px-4 py-1 mb-6 text-sm font-medium text-primary-foreground bg-primary/90 rounded-full shadow-lg"
        >
          <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
          Поездка Вашей Мечты Ждет
        </motion.div>

        <motion.h1 
          custom={1}
          variants={textVariants}
          className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.1)]"
        >
          Путешествуйте Стильно с <span className="animated-gradient-text drop-shadow-sm">BazCar</span>
        </motion.h1>
        
        <motion.p 
          custom={2}
          variants={textVariants}
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.05)]"
        >
          Откройте для себя безупречный опыт аренды автомобилей. Выбирайте из нашей тщательно подобранной коллекции премиальных, экологичных и стильных автомобилей.
        </motion.p>
        
        <motion.div 
          custom={3}
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button size="lg" asChild className="shadow-lg">
              <Link to="/cars">Посмотреть Автопарк</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

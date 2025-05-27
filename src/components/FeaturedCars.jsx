import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cars } from "@/data/cars";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

const FeaturedCars = () => {
  const featuredCars = cars.slice(0, 4);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section 
      className="py-20 bg-secondary"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <motion.div variants={itemVariants}>
            <div className="flex items-center text-primary mb-2">
              <TrendingUp className="h-6 w-6 mr-2" />
              <span className="text-sm font-semibold uppercase tracking-wider">Горячие Предложения</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Популярные Автомобили
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Откройте для себя наши самые популярные автомобили для аренды, отобранные за их стиль, производительность и комфорт.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-6 md:mt-0">
            <Button variant="outline" asChild className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
              <Link to="/cars" className="flex items-center">
                Посмотреть Все Машины <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedCars;
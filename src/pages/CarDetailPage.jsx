import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cars } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookingForm from "@/components/BookingForm";
import ImageCarousel from "@/components/ImageCarousel"; 
import AdditionalServicesSection from "@/components/AdditionalServicesSection";
import { 
  Car, 
  CalendarDays, 
  Users, 
  Gauge, 
  Zap, 
  Fuel, 
  Package, 
  ArrowLeft, 
  Star, 
  CheckCircle,
  Tag
} from "lucide-react";

const CarDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const car = cars.find(c => c.id === parseInt(id));
  
  const queryParams = new URLSearchParams(location.search);
  const action = queryParams.get('action');

  useEffect(() => {
    if (action === 'book') {
      const bookingFormElement = document.getElementById('booking-form-section');
      if (bookingFormElement) {
        bookingFormElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [action, id]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = (delay = 0) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { delay: delay * 0.1, duration: 0.5, ease: "easeOut" } },
  });

  if (!car) {
    return (
      <motion.div 
        className="container py-20 text-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-4xl font-bold text-destructive mb-4">Машина не найдена</h1>
        <p className="text-muted-foreground text-lg mb-8">Упс! Машина BazCar, которую вы ищете, недоступна или, возможно, уже уехала.</p>
        <Button asChild size="lg">
          <Link to="/cars">Посмотреть другие машины BazCar</Link>
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="py-16 bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container">
        <motion.div className="mb-8" variants={itemVariants(0)}>
          <Link to="/cars" className="text-sm text-primary hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Назад к автопарку BazCar
          </Link>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <motion.div variants={itemVariants(1)}>
            <div className="flex items-center mb-2">
              <div className="flex items-center text-yellow-400">
                <Star className="h-5 w-5 fill-yellow-400 mr-1" />
                <span className="text-md font-semibold text-foreground">{car.rating}/5</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">{car.name}</h1>
          </motion.div>
          
          <motion.div variants={itemVariants(2)} className="mt-4 md:mt-0 text-right">
            <div>
              <span className="text-2xl font-bold text-primary">{car.price.toLocaleString('ru-RU')} ₽</span>
              <span className="text-muted-foreground text-sm">/день (1-2 дня)</span>
            </div>
            {car.price_3plus_days && (
              <div className="mt-1">
                <span className="text-2xl font-bold text-green-500">{car.price_3plus_days.toLocaleString('ru-RU')} ₽</span>
                <span className="text-muted-foreground text-sm">/день (от 3 дней)</span>
                <Badge variant="success" className="ml-2 text-xs px-2 py-0.5 shadow-sm bg-green-100 text-green-700 border-green-300">
                  <Tag className="h-3 w-3 mr-1"/> Выгодно
                </Badge>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants(3)} className="mb-8">
              <ImageCarousel images={car.images} carName={car.name} />
            </motion.div>
            
            <motion.div variants={itemVariants(4)} className="mb-10 p-6 bg-card rounded-lg shadow-lg border border-border/50">
              <h2 className="text-3xl font-bold text-foreground mb-4">Об этой машине BazCar</h2>
              <p className="text-muted-foreground text-md leading-relaxed mb-6">
                {car.description_ru}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { icon: Car, label: car.specifications.engine_ru.split(" ")[0], sub: "Двигатель" },
                  { icon: Users, label: car.specifications.seating_ru.split(" ")[0], sub: "Мест" },
                  { icon: Gauge, label: car.specifications.topSpeed_ru.split(" ")[0], sub: "Макс. скорость" },
                  { icon: Zap, label: car.specifications.acceleration_ru.split(" ")[0], sub: "0-100км/ч" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="bg-secondary p-4 rounded-md hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className="h-7 w-7 mx-auto mb-1.5 text-primary" />
                    <span className="block text-lg font-semibold text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.sub}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants(5)} className="mb-10 p-6 bg-card rounded-lg shadow-lg border border-border/50">
              <h2 className="text-3xl font-bold text-foreground mb-5">Ключевые особенности</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {car.features_ru.map((feature, index) => (
                  <li key={index} className="flex items-center text-md text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mr-2.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants(6)} className="p-6 bg-card rounded-lg shadow-lg border border-border/50 mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-5">Характеристики</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { icon: Car, label: "Двигатель", value: car.specifications.engine_ru },
                  { icon: Zap, label: "Мощность", value: car.specifications.power_ru },
                  { icon: Gauge, label: "Разгон", value: car.specifications.acceleration_ru },
                  { icon: Gauge, label: "Макс. скорость", value: car.specifications.topSpeed_ru },
                  { icon: Users, label: "Количество мест", value: car.specifications.seating_ru },
                  { icon: Package, label: "Объем багажника", value: car.specifications.cargo_ru },
                  ...(car.specifications.fuelEconomy_ru ? [{ icon: Fuel, label: "Расход топлива", value: car.specifications.fuelEconomy_ru }] : []),
                  ...(car.specifications.range_ru ? [{ icon: CalendarDays, label: "Запас хода", value: car.specifications.range_ru }] : [])
                ].map((spec, index) => (
                  <div key={index} className="spec-item flex items-center">
                    <spec.icon className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">{spec.label}</p>
                      <p className="font-semibold text-foreground text-md">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants(6.5)}>
                 <AdditionalServicesSection onCarDetailPage={true} />
            </motion.div>

          </div>
          
          <motion.div id="booking-form-section" className="lg:col-span-1 sticky top-24" variants={itemVariants(7)}>
            <BookingForm car={car} price={car.price} price3PlusDays={car.price_3plus_days} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarDetailPage;
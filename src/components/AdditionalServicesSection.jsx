import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Baby, UserCheck, Gamepad2, Settings, User } from 'lucide-react';
import { useParams } from "react-router-dom";
import { additionalServicesConfig, serviceFees } from '@/config/bookingOptions';

const iconsMap = { Baby, UserCheck, Gamepad2, Settings, User };

// Helper function to get dynamic styles for each service
const getServiceStyles = (serviceId) => {
  switch (serviceId) {
    case 'youngDriver':
      return { iconColor: 'text-blue-500', bgColor: 'bg-blue-500/5', borderColor: 'border-blue-500/30 hover:border-blue-500/50', titleColor: 'text-blue-600' };
    case 'childSeat':
      return { iconColor: 'text-green-500', bgColor: 'bg-green-500/5', borderColor: 'border-green-500/30 hover:border-green-500/50', titleColor: 'text-green-600' };
    case 'personalDriver':
      return { iconColor: 'text-purple-500', bgColor: 'bg-purple-500/5', borderColor: 'border-purple-500/30 hover:border-purple-500/50', titleColor: 'text-purple-600' };
    case 'ps5':
      return { iconColor: 'text-red-500', bgColor: 'bg-red-500/5', borderColor: 'border-red-500/30 hover:border-red-500/50', titleColor: 'text-red-600' };
    case 'transmission':
      return { iconColor: 'text-yellow-500', bgColor: 'bg-yellow-500/5', borderColor: 'border-yellow-500/30 hover:border-yellow-500/50', titleColor: 'text-yellow-600' };
    default:
      return { iconColor: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-border/50', titleColor: 'text-foreground' };
  }
};

const AdditionalServicesSection = ({ onCarDetailPage = false }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px -5px hsla(var(--primary), 0.15)",
    }
  };

  const {id} = useParams();
  const carId = parseInt(id);

  const gridClasses = onCarDetailPage
    ? "grid-cols-1 md:grid-cols-2 gap-6"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8";

  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-10 md:mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
          Дополнительные Услуги
        </h2>
        <p className="text-md text-muted-foreground max-w-2xl mx-auto">
          Сделайте вашу поездку еще более комфортной с нашими опциями.
        </p>
      </motion.div>

      <motion.div
        className={`grid ${gridClasses}`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {additionalServicesConfig
            .filter(service => {
                if (service.id === 'ps5' && carId !== 3) {
                    return false;
                }
                return true;
            })
            .map((service, index) => {
              const IconComponent = iconsMap[service.iconKey];
              const displayPrice = service.feeType === 'daily' ? `${service.fee.toLocaleString('ru-RU')} ₽/день` : `${service.fee.toLocaleString('ru-RU')} ₽`;
              const styles = getServiceStyles(service.id);
              return (
                <motion.div key={service.id} variants={cardVariants} whileHover="hover">
                  <Card className={`h-full overflow-hidden shadow-lg transition-all duration-300 ease-out border-2 ${styles.borderColor} ${styles.bgColor}`}>
                    <CardHeader className={`p-5 flex flex-col items-center text-center`}>
                      <div className={`p-2.5 rounded-full mb-2.5 ${styles.bgColor}`}>
                         {IconComponent && <IconComponent className={`h-8 w-8 ${styles.iconColor}`} />}
                      </div>
                      <CardTitle className={`text-lg font-bold ${styles.titleColor}`}>{service.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 text-center flex flex-col flex-grow justify-between">
                      <p className="text-muted-foreground text-xs mb-3">{service.description}</p>
                      <p className={`text-xl font-bold ${styles.iconColor}`}>{displayPrice}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
      </motion.div>
    </div>
  );
};

export default AdditionalServicesSection;

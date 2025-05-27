import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Baby, UserCheck, Fuel, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: Baby,
    title: 'Детское кресло',
    description: 'Безопасность и комфорт для ваших маленьких пассажиров. Устанавливается по запросу.',
    price: '1 500 ₽ (на весь срок)',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/30 hover:border-blue-500/50',
    titleColor: 'text-blue-600',
  },
  {
    icon: UserCheck,
    title: 'Личный водитель',
    description: 'Наслаждайтесь поездкой, доверив управление профессионалу. Идеально для деловых поездок.',
    price: '5 000 ₽/день',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/5',
    borderColor: 'border-green-500/30 hover:border-green-500/50',
    titleColor: 'text-green-600',
  },
  {
    icon: Fuel,
    title: 'Полный бак бензина',
    description: 'Начните свое путешествие сразу, не беспокоясь о заправке. Машина будет ждать вас с полным баком.',
    price: '4 000 ₽',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-500/5',
    borderColor: 'border-orange-500/30 hover:border-orange-500/50',
    titleColor: 'text-orange-600',
  },
  {
    icon: ShieldCheck,
    title: 'Расширенная страховка',
    description: 'Дополнительное спокойствие в пути. Покрывает больше рисков для беззаботной поездки.',
    price: '2 500 ₽/день',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/5',
    borderColor: 'border-purple-500/30 hover:border-purple-500/50',
    titleColor: 'text-purple-600',
  }
];

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
        {services.map((service, index) => (
          <motion.div key={index} variants={cardVariants} whileHover="hover">
            <Card className={`h-full overflow-hidden shadow-lg transition-all duration-300 ease-out border-2 ${service.borderColor} ${service.bgColor}`}>
              <CardHeader className={`p-5 flex flex-col items-center text-center`}>
                <div className={`p-2.5 rounded-full mb-2.5 ${service.bgColor}`}>
                   <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                </div>
                <CardTitle className={`text-lg font-bold ${service.titleColor}`}>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 text-center flex flex-col flex-grow">
                <p className="text-muted-foreground text-xs mb-3 flex-grow">{service.description}</p>
                <p className={`text-md font-semibold ${service.iconColor}`}>{service.price}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdditionalServicesSection;

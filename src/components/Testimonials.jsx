import React from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonialsData = [
  {
    name: "Мадина",
    role: "Аренда Lixiang L7 Max 2025",
    content: "Очень понравился сервис, все грамотно объяснили и цены приемлемы. Отвечали на все вопросы быстро и вежливо. Рекомендую всем арендовать автомобили.",
    rating: 5,
    avatarInitial: "М"
  },
  {
    name: "Артур",
    role: "Аренда Geely Monjaro 2025 Hybrid",
    content: "Оперативно подогнали машину, оперативно давали обратную связь во время аренды, и не оставили без приятного бонуса, просто супер.",
    rating: 5,
    avatarInitial: "А"
  },
  {
    name: "Умар Тагиров",
    role: "Аренда Geely Monjaro 2025 Hybrid",
    content: "Ма ша Аллаҳ. Понравилось, быстро оперативно доставили машину.",
    rating: 5,
    avatarInitial: "УТ"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center text-primary mb-2">
            <MessageSquare className="h-6 w-6 mr-2" />
            <span className="text-sm font-semibold uppercase tracking-wider">Отзывы Клиентов</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-3">Что говорят наши клиенты</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Не верьте нам на слово — узнайте от наших довольных клиентов об их опыте работы с BazCar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-lg p-8 shadow-xl border border-border/50 flex flex-col"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic text-sm flex-grow">"{testimonial.content}"</p>
              <div className="flex items-center mt-auto">
                <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">{testimonial.avatarInitial}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import React from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonialsData = [
  {
    name: "Анна Иванова",
    role: "Предприниматель",
    content: "BazCar предоставил мне исключительный автомобиль для моей деловой поездки. Обслуживание было безупречным, а автомобиль в идеальном состоянии. Обязательно воспользуюсь их услугами снова.",
    rating: 5,
    avatarInitial: "АИ"
  },
  {
    name: "Михаил Петров",
    role: "Путешественник",
    content: "Как человек, который часто путешествует, я пользовался многими службами проката автомобилей, но BazCar выделяется. Их автопарк впечатляет, а обслуживание клиентов на высшем уровне. Настоятельно рекомендую!",
    rating: 5,
    avatarInitial: "МП"
  },
  {
    name: "Елена Сидорова",
    role: "Фотограф",
    content: "Мне нужен был надежный внедорожник для фотосъемки, и BazCar предоставил именно то, что мне было нужно. Процесс бронирования был гладким, а автомобиль работал безупречно.",
    rating: 4,
    avatarInitial: "ЕС"
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
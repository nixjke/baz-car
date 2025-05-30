import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DagestanAttractions from "@/components/DagestanAttractions";
import { MapPin, Mountain, Waves, Castle, Utensils, Users, Sun, Aperture, Landmark } from "lucide-react";

const galleryItems = [
  {
    title: "Величественные Горы",
    description: "Покоряйте вершины, наслаждайтесь панорамными видами и чистейшим горным воздухом. Дагестанские горы ждут своих исследователей.",
    imageKey: "majestic-mountains-dagestan",
    src: "/gallery/sulsky.webp",
    icon: Mountain,
    alt: "Величественные горы Дагестана на рассвете"
  },
  {
    title: "Древний Дербент",
    description: "Посетите один из старейших городов мира, его цитадель Нарын-Кала и уникальные магалы, хранящие тайны веков.",
    imageKey: "ancient-derbent-citadel",
    src: "/gallery/derbent.webp",
    icon: Castle,
    alt: "Древняя крепость Нарын-Кала в Дербенте"
  },
  {
    title: "Ласковый Каспий",
    description: "Отдохните на побережье Каспийского моря, насладитесь солнцем, золотистым песком и освежающими волнами.",
    imageKey: "caspian-sea-beach-dagestan",
    src: "/gallery/kaspy.webp",
    icon: Waves,
    alt: "Песчаный пляж Каспийского моря в Дагестане"
  },
  {
    title: "Сулакский Каньон",
    description: "Полюбуйтесь одним из глубочайших каньонов мира, его бирюзовыми водами и захватывающими дух пейзажами.",
    imageKey: "sulak-canyon-dagestan",
    src: "/gallery/sulasky.webp",
    icon: Aperture,
    alt: "Захватывающий вид на Сулакский каньон"
  },
];

const culturalHighlights = [
  {
    title: "Легендарное Гостеприимство",
    text: "Дагестанцы славятся своим радушием. Будьте готовы к теплым встречам, щедрым угощениям и искренним улыбкам.",
    icon: Users
  },
  {
    title: "Уникальная Кухня",
    text: "Попробуйте хинкал, курзе, чуду и другие блюда национальной кухни, которые поразят вас своим разнообразием и вкусом.",
    icon: Utensils
  },
  {
    title: "Аулы-Призраки и Древние Башни",
    text: "Исследуйте заброшенные аулы, такие как Гамсутль, и древние сторожевые башни, рассказывающие истории прошлых эпох.",
    icon: Landmark
  }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, delayChildren: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  }
}


const AboutDagestanPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.div
      className="bg-gradient-to-b from-background via-secondary/10 to-background text-foreground"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.section
        className="relative py-32 md:py-48 text-center text-white bg-cover bg-center bg-[url('/mosque.webp')]"
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6 [text-shadow:0_3px_6px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
          >
            Откройте Сердце Дагестана
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }}
          >
            Край величественных гор, древних традиций и невероятного гостеприимства. Путешествуйте по Дагестану с комфортом на автомобилях BazCar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.5 } }}
          >
            <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 shadow-xl">
              <Link to="/cars">Выбрать автомобиль</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Introduction to Dagestan */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        variants={sectionVariants}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Дагестан – Жемчужина Кавказа</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Республика Дагестан, расположенная на юге России, – это удивительный регион, где переплетаются древняя история и современность, суровые горные пейзажи и теплое Каспийское море. Здесь каждый найдет что-то для себя: от покорения горных вершин до исследования старинных крепостей и наслаждения уникальной местной кухней.
          </p>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        className="py-16 md:py-24 bg-secondary/30"
        variants={sectionVariants}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Природные Чудеса и Архитектура</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg bg-card border border-border/50 group"
                variants={sectionVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover="hover"
              >
                <motion.div className="relative aspect-[4/3] overflow-hidden" variants={imageVariants}>
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={item.alt}
                    src={item.src} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <item.icon className="absolute top-4 left-4 h-8 w-8 text-white opacity-80" />
                </motion.div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Cultural Highlights */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        variants={sectionVariants}
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Культура и Традиции</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {culturalHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-300"
                variants={sectionVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                  <highlight.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{highlight.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* DagestanAttractions Component Integration */}
      <motion.div
        variants={sectionVariants}
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <DagestanAttractions />
      </motion.div>

      {/* Call to Action */}
      <motion.section
        className="py-20 md:py-32 bg-gradient-to-r from-primary to-accent text-white"
        variants={sectionVariants}
        custom={5}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container text-center">
          <Sun className="h-16 w-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы к Приключениям в Дагестане?</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Выберите идеальный автомобиль BazCar и отправляйтесь в незабываемое путешествие по этому удивительному краю.
            Мы поможем сделать вашу поездку комфортной и безопасной.
          </p>
          <Button size="xl" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-7 shadow-lg">
            <Link to="/cars">Найти свой BazCar</Link>
          </Button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutDagestanPage;
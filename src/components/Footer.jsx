
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Youtube, Send, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3183073c-69ec-4666-9f19-bda97b6b51b5/4c44dd7280cd9d97e18fc6fb7abc94e9.png";

  const quickLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Автопарк', href: '/cars' },
    { label: 'О Дагестане', href: '/about-dagestan' },
    { label: 'Корзина', href: '/cart' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <motion.footer 
      className="bg-card text-card-foreground border-t border-border/50 pt-16 pb-8"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
              <img src={logoUrl} alt="BazCar Logo" className="h-10 w-auto" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                BazCar
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ваш надежный партнер по аренде премиальных автомобилей в Дагестане. Путешествуйте с комфортом и стилем.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg font-semibold text-foreground mb-5">Быстрые ссылки</p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-lg font-semibold text-foreground mb-5">Контакты</p>
            <div className="flex items-start space-x-3 text-sm text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span>ул. Имама Шамиля, 42, Махачкала, Дагестан, Россия</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <a href="tel:+79281234567" className="hover:text-primary hover:underline">+7 (928) 123-45-67</a>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a href="mailto:info@bazcar.ru" className="hover:text-primary hover:underline">info@bazcar.ru</a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-lg font-semibold text-foreground mb-5">Подписка на новости</p>
            <p className="text-sm text-muted-foreground mb-3">
              Получайте эксклюзивные предложения и новости о нашем автопарке.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Ваш Email" className="flex-grow text-sm" aria-label="Email для подписки"/>
              <Button type="submit" size="icon" aria-label="Подписаться">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants} 
          className="border-t border-border/50 pt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BazCar. Все права защищены.
            Разработано с ❤️ в Дагестане.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

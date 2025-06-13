import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ShoppingCart, MapPinned, Sun, Moon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeProvider';

const navItems = [
  { label: 'Главная', href: '/' },
  { label: 'Автопарк', href: '/cars' },
  { label: 'О Дагестане', href: '/about-dagestan' },
];

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart(); // Changed from 'cart' to 'cartItems'
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Each item in cartItems is a unique booking, so length of array is the total.
  // If items could have a 'quantity' property for multiple identical bookings,
  // then reduce would be appropriate. Assuming 1 item = 1 booking.
  const totalCartItems = cartItems ? cartItems.length : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsSheetOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinkClasses = ({ isActive }) =>
    `relative font-medium pb-1.5 transition-colors duration-200 ease-out hover:text-primary ${
      isActive ? 'text-primary after:w-full' : 'text-foreground/80 after:w-0 hover:after:w-full'
    } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block py-3 px-4 text-lg font-medium rounded-md transition-colors duration-200 ease-out ${
      isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'
    }`;
  
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3183073c-69ec-4666-9f19-bda97b6b51b5/4c44dd7280cd9d97e18fc6fb7abc94e9.png";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? 'bg-background/95 shadow-lg backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <img src='/logo.png' alt="BazCar Logo" className="h-10 w-auto" />
          <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            BazCar
          </span>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.href} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5 text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <Link to="/cart" className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <ShoppingCart className="h-6 w-6 text-primary" />
            {totalCartItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {totalCartItems}
              </motion.span>
            )}
          </Link>
          
          <div className="hidden lg:block">
            <Button asChild className="group">
              <Link to="/cars">
                Забронировать <MapPinned className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm bg-background p-0">
              <SheetHeader className="p-6 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <img src={logoUrl} alt="BazCar Logo" className="h-8 w-auto" /> BazCar
                </SheetTitle>
              </SheetHeader>
              <div className="p-6 space-y-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    className={mobileNavLinkClasses}
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Button asChild size="lg" className="w-full mt-4 group">
                  <Link to="/cars" onClick={() => setIsSheetOpen(false)}>
                    Забронировать <MapPinned className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import CarsPage from "@/pages/CarsPage";
import CarDetailPage from "@/pages/CarDetailPage";
import CartPage from "@/pages/CartPage";
import AboutDagestanPage from "@/pages/AboutDagestanPage.jsx";
import NotFoundPage from "@/pages/NotFoundPage";
import { AnimatePresence, motion } from "framer-motion";

const PageLayout = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};


const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
        <Route path="/cars" element={<PageLayout><CarsPage /></PageLayout>} />
        <Route path="/cars/:id" element={<PageLayout><CarDetailPage /></PageLayout>} />
        <Route path="/cart" element={<PageLayout><CartPage /></PageLayout>} />
        <Route path="/about-dagestan" element={<PageLayout><AboutDagestanPage /></PageLayout>} />
        <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, Car, AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="container py-20 text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-10 bg-card rounded-xl shadow-2xl border border-border/50 max-w-lg w-full"
      >
        <AlertTriangle className="h-20 w-20 text-destructive mx-auto mb-6" />
        <h1 className="text-7xl font-extrabold text-destructive mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-foreground mb-6">Страница не найдена</h2>
        <p className="text-muted-foreground mb-10">
          Упс! Страница, которую вы ищете, не существует или была перемещена.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="shadow-md">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-5 w-5" /> На Главную
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary shadow-md">
            <Link to="/cars" className="flex items-center">
              <Car className="mr-2 h-5 w-5" /> Посмотреть Машины
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
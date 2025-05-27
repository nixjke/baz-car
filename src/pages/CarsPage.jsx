import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { cars } from "@/data/cars";
import CarCard from "@/components/CarCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, DollarSign, RotateCcw, Fuel, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

const CarsPage = () => {
  const location = useLocation();

  const maxPrice = Math.max(...cars.map(car => car.price), 10000); 
  const minPrice = Math.min(...cars.map(car => car.price), 0);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedFuelTypes, setSelectedFuelTypes] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState([minPrice, maxPrice]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const fuelTypes = [...new Set(cars.map(car => car.fuelType))];
  
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.description_ru.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFuelType = selectedFuelTypes.length === 0 ? true : selectedFuelTypes.includes(car.fuelType);
    
    const effectivePrice = car.price_3plus_days ? car.price_3plus_days : car.price;
    const matchesPrice = effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
    
    return matchesSearch && matchesFuelType && matchesPrice;
  });
  
  const handleFuelTypeClick = (fuelType) => {
    setSelectedFuelTypes(prevSelected =>
      prevSelected.includes(fuelType)
        ? prevSelected.filter(type => type !== fuelType)
        : [...prevSelected, fuelType]
    );
  };
  
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = index === 0 ? minPrice : maxPrice;

    newRange[index] = value;
    if (index === 0 && newRange[0] > newRange[1]) newRange[1] = newRange[0];
    if (index === 1 && newRange[1] < newRange[0]) newRange[0] = newRange[1];
    
    setPriceRange(newRange);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedFuelTypes([]);
    setPriceRange([minPrice, maxPrice]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
  };
  
  return (
    <div className="py-12 md:py-16 bg-background">
      <div className="container">
        <motion.div 
          className="mb-10 md:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-3">Наш Автопарк</h1>
          <p className="text-md sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Ознакомьтесь с нашей эксклюзивной коллекцией премиальных автомобилей. Найдите идеальный BazCar для вашего незабываемого путешествия.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            className="lg:w-1/4 xl:w-1/5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-card p-5 md:p-6 rounded-xl shadow-xl border border-border/50 sticky top-24">
              <h2 className="text-xl md:text-2xl font-semibold mb-5 md:mb-6 flex items-center text-foreground">
                <Filter className="h-5 w-5 md:h-6 md:w-6 mr-2 text-primary" /> Фильтры
              </h2>
              
              <div className="mb-5 md:mb-6">
                <Label htmlFor="search" className="mb-1.5 block text-sm font-medium text-foreground flex items-center">
                  <Search className="h-4 w-4 mr-1.5 text-primary/80" /> Поиск
                </Label>
                <div className="relative">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Напр., Tesla Model S"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 pr-4 py-2.5 text-sm border-border/70 focus:border-primary focus:ring-primary/50"
                  />
                </div>
              </div>
              
              <div className="mb-5 md:mb-6">
                <h3 className="text-sm font-medium mb-2.5 text-foreground flex items-center">
                  <Fuel className="h-4 w-4 mr-1.5 text-primary/80" /> Тип двигателя
                </h3>
                <div className="flex flex-wrap gap-2">
                  {fuelTypes.map(fuelType => {
                    const isSelected = selectedFuelTypes.includes(fuelType);
                    return (
                      <Badge
                        key={fuelType}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer transition-all text-xs px-2.5 py-1.5 duration-200 ease-out flex items-center ${isSelected ? 'bg-primary text-primary-foreground shadow-md' : 'border-border/60 text-muted-foreground hover:bg-secondary hover:text-secondary-foreground hover:border-primary/50'}`}
                        onClick={() => handleFuelTypeClick(fuelType)}
                      >
                        {isSelected ? <CheckSquare className="h-3.5 w-3.5 mr-1.5" /> : <Square className="h-3.5 w-3.5 mr-1.5 opacity-50" />}
                        {fuelType}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              
              <div className="mb-6 md:mb-8">
                <h3 className="text-sm font-medium mb-2.5 text-foreground flex items-center">
                  <DollarSign className="h-4 w-4 mr-1.5 text-primary/80" /> Цена (₽/день)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                    <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <input 
                    type="range" 
                    min={minPrice} 
                    max={maxPrice} 
                    value={priceRange[0]} 
                    step="100"
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    aria-label="Минимальная цена"
                  />
                  <input 
                    type="range" 
                    min={minPrice} 
                    max={maxPrice}
                    value={priceRange[1]}
                    step="100"
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    aria-label="Максимальная цена"
                  />
                </div>
              </div>
              <Button onClick={resetFilters} variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 flex items-center justify-center text-sm py-2.5">
                <RotateCcw className="h-3.5 w-3.5 mr-2" /> Сбросить фильтры
              </Button>
            </div>
          </motion.aside>
          
          <motion.main
            className="lg:w-3/4 xl:w-4/5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-16 md:py-20 bg-card rounded-lg shadow-md border border-border/50 flex flex-col items-center justify-center min-h-[400px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Search className="h-14 w-14 md:h-16 md:w-16 text-primary mx-auto mb-5 md:mb-6 opacity-50" />
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">Машины BazCar не найдены</h3>
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                  Попробуйте изменить фильтры или проверьте позже наличие новых поступлений!
                </p>
              </motion.div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
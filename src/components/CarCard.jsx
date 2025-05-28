
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
    Car, Star, Users, Zap, Fuel, ShoppingCart, Send, AlertTriangle, 
    Baby, UserCheck, CreditCard, Tag, Gamepad2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { additionalServicesConfig, serviceFees } from "@/config/bookingOptions.js";

const iconsMap = { Baby, UserCheck, Fuel, User: Users, Gamepad2: Gamepad2 };

const CarCardImage = ({ car }) => (
  <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden group">
    <img    
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
      alt={`${car.name} - автомобиль в аренду`}
     src={car.images.at(0)} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex space-x-2">
      <Badge 
        variant="outline"
        className="shadow-md bg-background/80 text-foreground text-xs px-2.5 py-1 border-primary/50"
      >
        <Fuel className="h-3 w-3 mr-1 text-primary" />{car.fuelType}
      </Badge>
    </div>
  </div>
);

const CarCardHeaderContent = ({ car }) => (
  <CardHeader className="p-4 sm:p-5">
    <div className="flex justify-between items-start mb-0.5">
      <CardTitle className="text-lg sm:text-xl font-bold text-foreground leading-tight truncate pr-2">{car.name}</CardTitle>
      <div className="flex items-center text-xs sm:text-sm shrink-0">
        <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400 mr-1" />
        <span className="font-semibold text-muted-foreground">{car.rating}</span>
      </div>
    </div>
  </CardHeader>
);

const CarCardSpecs = ({ car }) => (
  <div className="grid grid-cols-3 gap-x-2 sm:gap-x-3 gap-y-2 text-xs text-muted-foreground mb-3 sm:mb-4">
    {[
      { icon: Users, value: car.specifications.seating_ru.split(' ')[0], unit: "Мест" },
      { icon: Zap, value: car.specifications.power_ru.split(' ')[0], unit: "л.с." },
      { icon: Car, value: car.specifications.engine_ru.split(' ')[0], unit: "Двиг." }
    ].map((spec, index) => (
      <div key={index} className="flex flex-col items-center p-1.5 sm:p-2 bg-secondary/70 rounded-md">
        <spec.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mb-0.5 text-primary" />
        <span className="font-medium text-xs sm:text-sm">{spec.value}</span>
        <span className="text-xxs sm:text-xs">{spec.unit}</span>
      </div>
    ))}
  </div>
);

const CarCardMainContent = ({ car }) => (
  <CardContent className="p-4 sm:p-5 pt-0 flex-grow">
    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
      {car.description_ru}
    </p>
    <CarCardSpecs car={car} />
  </CardContent>
);

const CarCardFooterActions = ({ car, onQuickBook, onOpenQuickAddModal }) => {
  const displayPrice = car.price ? car.price : car.price_3plus_days;
  return (
    <CardFooter className="p-3 sm:p-4 border-t border-border/50 flex flex-col items-stretch space-y-2 sm:space-y-3 bg-secondary/40">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-muted-foreground text-xxs sm:text-xs">От </span>
          <span className="text-lg sm:text-2xl font-bold text-primary">{displayPrice.toLocaleString('ru-RU')} ₽</span>
          <span className="text-muted-foreground text-xxs sm:text-xs">/день</span>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onQuickBook}
          className="border-primary text-primary hover:bg-primary/10 hover:text-primary h-8 w-8 sm:h-9 sm:w-9"
          aria-label="Забронировать сразу"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        size="sm" 
        className="w-full group bg-primary/90 hover:bg-primary text-primary-foreground text-xs sm:text-sm py-2 sm:py-2.5"
        onClick={onOpenQuickAddModal}
        aria-label="Добавить в корзину"
      >
        <ShoppingCart className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" /> В корзину
      </Button>
    </CardFooter>
  );
};

const QuickAddAdditionalServiceCheckbox = ({ id, checked, onCheckedChange, label, fee, feeType = "fixed", iconKey }) => {
    const IconComponent = iconsMap[iconKey];
    console.log(IconComponent)
    return (
        <div className="flex items-center space-x-2 py-1">
            <Checkbox id={`quick-${id}`} name={id} checked={checked} onCheckedChange={onCheckedChange} />
            <Label htmlFor={`quick-${id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
                {IconComponent && <IconComponent className="h-4 w-4 mr-1.5 text-primary/80" />}
                {label}
                <span className="text-primary/90 font-semibold ml-1 text-xs">
                    (+{fee.toLocaleString('ru-RU')} ₽{feeType === "daily" ? "/день" : ""})
                </span>
            </Label>
        </div>
    );
};

const QuickAddPriceDetails = ({ rentalDays, servicesData, carPrice, carPrice3PlusDays }) => {
    if (rentalDays <= 0) return null;

    let currentDailyPrice = carPrice;
    if (rentalDays >= 3 && carPrice3PlusDays) {
        currentDailyPrice = carPrice3PlusDays;
    }
    
    const rentalCost = currentDailyPrice * rentalDays;
    
    let servicesCost = 0;
    if (servicesData.youngDriver) servicesCost += serviceFees.youngDriver;
    if (servicesData.childSeat) servicesCost += serviceFees.childSeat;
    if (servicesData.personalDriver) servicesCost += serviceFees.personalDriver * rentalDays;
    if (servicesData.ps5) servicesCost += serviceFees.ps5;

    console.log(":test")

    const totalAmount = rentalCost + servicesCost;

    return (
        <div className="mt-4 pt-3 border-t border-border/50 space-y-1.5">
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Аренда ({rentalDays} дн. x {currentDailyPrice.toLocaleString('ru-RU')} ₽):</span>
                <span className="font-medium text-foreground">{rentalCost.toLocaleString('ru-RU')} ₽</span>
            </div>
            {rentalDays >=3 && carPrice3PlusDays && (
                <div className="flex justify-start items-center text-xs text-green-600">
                    <Tag className="h-3 w-3 mr-1"/><span>Применена скидка (от 3-х дней)</span>
                </div>
            )}
            {Object.entries(servicesData).map(([key, value]) => {
                if (value && serviceFees[key]) {
                    const serviceConfig = additionalServicesConfig.find(s => s.id === key);
                    if (!serviceConfig) return null;
                    const cost = serviceConfig.feeType === 'daily' ? serviceConfig.fee * rentalDays : serviceConfig.fee;
                    return (
                        <div key={key} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{serviceConfig.label.split('(')[0].trim()}:</span>
                            <span className="text-foreground">+{cost.toLocaleString('ru-RU')} ₽</span>
                        </div>
                    );
                }
                return null;
            })}
             <div className="flex justify-between items-center text-md font-semibold mt-2 pt-2 border-t border-dashed border-border/30">
                <span className="text-foreground flex items-center"><CreditCard className="h-4 w-4 mr-1.5 text-primary"/>Итого:</span>
                <span className="text-primary">{totalAmount.toLocaleString('ru-RU')} ₽</span>
            </div>
        </div>
    );
};


const QuickAddModal = ({ isOpen, onOpenChange, car, quickAddData, onInputChange, onCheckboxChange, onConfirm }) => {
    const { rentalDays, dailyPrice } = useMemo(() => {
        let days = 0;
        let pricePerDay = car.price;
        if (quickAddData.pickupDate && quickAddData.returnDate) {
            const pickup = new Date(quickAddData.pickupDate);
            const ret = new Date(quickAddData.returnDate);
            if (ret > pickup) {
                const diffTime = Math.abs(ret - pickup);
                days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (days === 0 && diffTime > 0) days = 1; 
            }
        }
        if (days >= 3 && car.price_3plus_days) {
            pricePerDay = car.price_3plus_days;
        }
        return { rentalDays: days, dailyPrice: pricePerDay };
    }, [quickAddData.pickupDate, quickAddData.returnDate, car.price, car.price_3plus_days]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Быстрое добавление: {car.name}</DialogTitle>
                    <DialogDescription>
                        Укажите данные и выберите опции. Цена будет рассчитана автоматически.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-4 items-center gap-x-3 gap-y-1.5">
                        <Label htmlFor="quick-name" className="text-right col-span-1 text-xs sm:text-sm">Имя*</Label>
                        <Input id="quick-name" name="name" value={quickAddData.name} onChange={onInputChange} className="col-span-3 text-sm h-9" placeholder="Иван Иванов" />
                    
                        <Label htmlFor="quick-phone" className="text-right col-span-1 text-xs sm:text-sm">Телефон*</Label>
                        <Input id="quick-phone" name="phone" type="tel" value={quickAddData.phone} onChange={onInputChange} className="col-span-3 text-sm h-9" placeholder="+79990000000" />
                    
                        <Label htmlFor="quick-pickupDate" className="text-right col-span-1 text-xs sm:text-sm">С*</Label>
                        <Input id="quick-pickupDate" name="pickupDate" type="date" value={quickAddData.pickupDate} onChange={onInputChange} className="col-span-3 text-sm h-9" min={new Date().toISOString().split('T')[0]} />
                    
                        <Label htmlFor="quick-returnDate" className="text-right col-span-1 text-xs sm:text-sm">По*</Label>
                        <Input id="quick-returnDate" name="returnDate" type="date" value={quickAddData.returnDate} onChange={onInputChange} className="col-span-3 text-sm h-9" min={quickAddData.pickupDate || new Date().toISOString().split('T')[0]} />
                    </div>

                    <div className="pt-3 mt-2 border-t border-border/50">
                        <Label className="text-sm font-medium text-foreground mb-1.5 block">Дополнительные опции</Label>
                        <div className="space-y-0.5">
                            {additionalServicesConfig.map(service => (
                                <QuickAddAdditionalServiceCheckbox
                                    key={service.id}
                                    id={service.id}
                                    checked={quickAddData[service.id]}
                                    onCheckedChange={(checked) => onCheckboxChange(service.id, checked)}
                                    label={service.label}
                                    fee={service.fee}
                                    feeType={service.feeType}
                                    iconKey={service.iconKey}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <QuickAddPriceDetails 
                        rentalDays={rentalDays} 
                        dailyPrice={dailyPrice} 
                        servicesData={{
                            youngDriver: quickAddData.youngDriver,
                            childSeat: quickAddData.childSeat,
                            personalDriver: quickAddData.personalDriver,
                            ps5: quickAddData.ps5
                        }}
                        carPrice={car.price}
                        carPrice3PlusDays={car.price_3plus_days}
                    />
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Отмена</Button>
                    <Button onClick={onConfirm}>Добавить в корзину</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const initialQuickAddData = {
    name: "",
    phone: "",
    pickupDate: new Date().toISOString().split('T')[0],
    returnDate: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    })(),
    youngDriver: false,
    childSeat: false,
    personalDriver: false,
    ps5: false,
  };
  const [quickAddData, setQuickAddData] = React.useState(initialQuickAddData);

  const cardMotionVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 15px 30px -10px hsla(var(--primary), 0.2)",
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };
  
  const handleOpenQuickAddModal = (e) => {
    e.preventDefault(); e.stopPropagation(); setIsModalOpen(true);
  };
  const handleQuickAddInputChange = (e) => {
    const { name, value } = e.target;
    setQuickAddData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickAddCheckboxChange = (name, checked) => {
    setQuickAddData(prev => ({ ...prev, [name]: checked }));
  };

  const handleConfirmQuickAddToCart = () => {
    if (!quickAddData.name || !quickAddData.phone || !quickAddData.pickupDate || !quickAddData.returnDate) {
      toast({ title: "Заполните данные", description: "Пожалуйста, укажите имя, телефон и даты для добавления в корзину.", variant: "destructive", icon: <AlertTriangle className="h-5 w-5 text-destructive-foreground" /> });
      return;
    }
    const pickup = new Date(quickAddData.pickupDate);
    const ret = new Date(quickAddData.returnDate);
    if (ret <= pickup) {
       toast({ title: "Ошибка в датах", description: "Дата возврата должна быть позже даты получения.", variant: "destructive" });
      return;
    }

    const rentalDays = Math.ceil(Math.abs(ret - pickup) / (1000 * 60 * 60 * 24)) || 1;
    let dailyPrice = car.price;
    if (rentalDays >= 3 && car.price_3plus_days) dailyPrice = car.price_3plus_days;

    const cartItem = {
      car, 
      pickupDate: quickAddData.pickupDate, 
      returnDate: quickAddData.returnDate, 
      name: quickAddData.name, 
      email: "", // Email is optional for quick add
      phone: quickAddData.phone,
      deliveryOption: { id: "pickup", label: "Самовывоз", price: 0 }, // Default for quick add
      youngDriver: quickAddData.youngDriver, 
      childSeat: quickAddData.childSeat, 
      personalDriver: quickAddData.personalDriver, 
      fullTank: quickAddData.fullTank,
      ps5: quickAddData.ps5,
      rentalDays, 
      dailyPrice,
    };
    addToCart(cartItem);
    setIsModalOpen(false);
    setQuickAddData(initialQuickAddData); // Reset form
  };

  const handleQuickBook = (e) => {
    e.preventDefault(); e.stopPropagation(); navigate(`/cars/${car.id}?action=book`);
  };
  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    navigate(`/cars/${car.id}`);
  };

  return (
    <>
      <motion.div
        variants={cardMotionVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.1 }}
        className="h-full cursor-pointer"
        onClick={handleCardClick}
      >
        <Card className="overflow-hidden h-full flex flex-col bg-card border border-border/60 rounded-xl shadow-lg transition-all duration-300 ease-out">
          <CarCardImage car={car} />
          <CarCardHeaderContent car={car} />
          <CarCardMainContent car={car} />
          <CarCardFooterActions car={car} onQuickBook={handleQuickBook} onOpenQuickAddModal={handleOpenQuickAddModal} />
        </Card>
      </motion.div>
      <QuickAddModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        car={car}
        quickAddData={quickAddData} 
        onInputChange={handleQuickAddInputChange} 
        onCheckboxChange={handleQuickAddCheckboxChange}
        onConfirm={handleConfirmQuickAddToCart} 
      />
    </>
  );
};

export default CarCard;

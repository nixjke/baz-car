import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { deliveryOptionsData, additionalServicesConfig, serviceFees } from "@/config/bookingOptions.js";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, AlertTriangle, Truck, Users2, CreditCard, Tag, ShoppingCart, Baby, UserCheck, Fuel, Gamepad2, Settings } from "lucide-react";

const iconsMap = {
  CalendarIcon, AlertTriangle, Truck, Users2, CreditCard, Tag, ShoppingCart, Baby, UserCheck, Fuel, Gamepad2, Settings
};

const initialFormData = {
  dateRange: {
    from: undefined,
    to: undefined
  },
  name: "",
  email: "",
  phone: "",
  deliveryOption: "pickup",
  youngDriver: false,
  childSeat: false,
  personalDriver: false,
  ps5: false,
  transmission: false
};

const FormInputGroup = ({ id, name, label, type, value, onChange, required, min, placeholder, icon: IconKey }) => {
  const IconComponent = iconsMap[IconKey];
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="flex items-center text-sm font-medium text-foreground">
        {IconComponent && <IconComponent className="h-4 w-4 mr-2 text-primary" />}
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        placeholder={placeholder}
        className="border-border/70 focus:border-primary focus:ring-primary/50"
      />
    </div>
  );
};

const DeliveryOptionsGroup = ({ value, onChange, options }) => (
  <div className="space-y-3 pt-4 mt-4 border-t border-border/50">
    <Label className="flex items-center text-sm font-medium text-foreground mb-1">
      <Truck className="h-4 w-4 mr-2 text-primary" /> Опции доставки
    </Label>
    <RadioGroup
      name="deliveryOption"
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-1 sm:grid-cols-3 gap-2"
    >
      {options.map(option => {
        const IconComponent = iconsMap[option.iconKey];
        return (
          <Label
            key={option.id}
            htmlFor={`delivery-${option.id}`}
            className={`flex flex-col items-center justify-center rounded-md border-2 p-3 hover:border-primary cursor-pointer transition-all ${value === option.id ? "border-primary bg-primary/5 shadow-md" : "border-border/50"}`}
          >
            <RadioGroupItem value={option.id} id={`delivery-${option.id}`} className="sr-only" />
            {IconComponent && <IconComponent className={`h-5 w-5 mb-1.5 ${value === option.id ? "text-primary" : "text-muted-foreground"}`} />}
            <span className="text-xs font-medium">{option.label}</span>
            <span className={`text-xxs ${value === option.id ? "text-primary" : "text-muted-foreground"}`}>
              {option.price > 0 ? `+${option.price.toLocaleString('ru-RU')} ₽` : "Бесплатно"}
            </span>
          </Label>
        );
      })}
    </RadioGroup>
  </div>
);

const AdditionalServiceCheckbox = ({ id, checked, onCheckedChange, label, fee, feeType = "fixed", icon: IconKey, carId }) => {
  if (id === 'ps5' && carId !== 3) {
    return null;
  }
  const IconComponent = iconsMap[IconKey];

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        name={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
        {IconComponent && <IconComponent className="h-4 w-4 mr-1.5 text-primary/80" />}
        {label}
        <span className="text-primary font-semibold ml-1">
          (+{fee.toLocaleString('ru-RU')} ₽{feeType === "daily" ? "/день" : ""})
        </span>
      </Label>
    </div>
  );
};

const PriceDetails = ({ rentalDays, dailyPrice, deliveryOptionId, youngDriver, additionalServices, carId }) => {
  const deliveryCost = deliveryOptionsData.find(opt => opt.id === deliveryOptionId)?.price || 0;
  const rentalCost = dailyPrice * rentalDays;

  let additionalServicesCostTotal = 0;

  additionalServicesConfig.forEach(service => {
    if (service.id === 'ps5' && carId !== 3) {
      return;
    }
    if (additionalServices[service.id]) {
      additionalServicesCostTotal += service.fee;
    }
  });

  const totalAmount = rentalCost + deliveryCost + (youngDriver ? serviceFees.youngDriver : 0) + additionalServicesCostTotal;

  return (
    <>
      <div className="space-y-1 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Аренда ({rentalDays} дн. x {dailyPrice.toLocaleString('ru-RU')} ₽):</span>
          <span className="font-semibold text-foreground">{rentalCost.toLocaleString('ru-RU')} ₽</span>
        </div>
        {rentalDays >= 3 && (
          <div className="flex justify-start items-center text-xs text-green-600">
            <Tag className="h-3 w-3 mr-1"/><span>Применена скидка за аренду от 3-х дней</span>
          </div>
        )}
        {deliveryCost > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Доставка:</span>
            <span className="text-foreground">+{deliveryCost.toLocaleString('ru-RU')} ₽</span>
          </div>
        )}
        {youngDriver && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Молодой водитель:</span>
            <span className="text-foreground">+{serviceFees.youngDriver.toLocaleString('ru-RU')} ₽</span>
          </div>
        )}
        {additionalServicesConfig.map(service => {
          if (service.id === 'ps5' && carId !== 3) {
            return null;
          }
          if (additionalServices[service.id]) {
            return (
              <div key={service.id} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{service.label}:</span>
                <span className="text-foreground">+{service.fee.toLocaleString('ru-RU')} ₽</span>
              </div>
            );
          }
          return null;
        })}
      </div>

      {totalAmount > 0 && (
        <div className="flex justify-between items-center mb-4 border-t border-dashed border-border/50 pt-3">
          <span className="text-md font-medium text-foreground flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-primary" />Итого за позицию:
          </span>
          <span className="text-xl font-bold text-primary">{totalAmount.toLocaleString('ru-RU')} ₽</span>
        </div>
      )}
    </>
  );
};

const BookingForm = ({ car, price, price3PlusDays, bookedDates }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleDeliveryChange = (value) => {
    setFormData(prev => ({ ...prev, deliveryOption: value }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Преобразуем забронированные даты в формат для календаря
  const disabledDates = useMemo(() => {
    return bookedDates.map(booking => ({
      from: new Date(booking.startDate),
      to: new Date(booking.endDate)
    }));
  }, [bookedDates]);

  // Функция проверки пересечения дат
  const hasDateOverlap = (startDate, endDate) => {
    return disabledDates.some(booking => {
      const bookingStart = new Date(booking.from);
      const bookingEnd = new Date(booking.to);
      return (
        (startDate <= bookingEnd && startDate >= bookingStart) || // Начало выбранного периода попадает в бронь
        (endDate <= bookingEnd && endDate >= bookingStart) || // Конец выбранного периода попадает в бронь
        (startDate <= bookingStart && endDate >= bookingEnd) // Выбранный период полностью содержит бронь
      );
    });
  };

  // Обработчик изменения диапазона дат
  const handleDateRangeChange = (range) => {
    if (!range?.from) {
      setFormData(prev => ({
        ...prev,
        dateRange: { from: undefined, to: undefined }
      }));
      return;
    }

    // Если выбрана только начальная дата
    if (range.from && !range.to) {
      setFormData(prev => ({
        ...prev,
        dateRange: { from: range.from, to: undefined }
      }));
      return;
    }

    // Если выбраны обе даты
    if (range.from && range.to) {
      // Проверяем пересечение с существующими бронированиями
      if (hasDateOverlap(range.from, range.to)) {
        toast({
          title: "Даты недоступны",
          description: "Выбранный период пересекается с существующими бронированиями. Пожалуйста, выберите другой период.",
          variant: "destructive",
          icon: <AlertTriangle className="h-5 w-5 text-destructive-foreground" />,
        });
        
        // Полностью сбрасываем выбор дат
        setFormData(prev => ({
          ...prev,
          dateRange: { from: undefined, to: undefined }
        }));
        return;
      }

      // Если пересечений нет, сохраняем диапазон
      setFormData(prev => ({
        ...prev,
        dateRange: range
      }));
    }
  };

  // Функция для определения, является ли дата забронированной
  const isDateBooked = (date) => {
    return disabledDates.some(booking => {
      const bookingStart = new Date(booking.from);
      const bookingEnd = new Date(booking.to);
      return date >= bookingStart && date <= bookingEnd;
    });
  };

  // Функция для определения, можно ли выбрать дату
  const canSelectDate = (date) => {
    if (!formData.dateRange.from) return true;
    
    // Если начальная дата уже выбрана, проверяем все даты в диапазоне
    const startDate = formData.dateRange.from;
    const endDate = date;
    
    // Определяем, какая дата раньше
    const rangeStart = startDate < endDate ? startDate : endDate;
    const rangeEnd = startDate < endDate ? endDate : startDate;
    
    // Проверяем все даты в диапазоне
    for (let d = new Date(rangeStart); d <= rangeEnd; d.setDate(d.getDate() + 1)) {
      if (isDateBooked(d)) {
        return false;
      }
    }
    
    return true;
  };

  const calculateCurrentItemTotal = useCallback(() => {
    let total = 0;
    let rentalDays = 0;
    let currentDailyPrice = price;

    if (formData.dateRange.from && formData.dateRange.to) {
      const diffTime = Math.abs(formData.dateRange.to - formData.dateRange.from);
      rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (rentalDays === 0 && diffTime > 0) rentalDays = 1;

      if (rentalDays >= 3 && price3PlusDays) {
        currentDailyPrice = price3PlusDays;
      } else if (rentalDays > 0) {
        currentDailyPrice = price;
      }
    }

    const selectedDelivery = deliveryOptionsData.find(opt => opt.id === formData.deliveryOption);
    if (selectedDelivery) {
      total += selectedDelivery.price;
    }

    if (formData.youngDriver) total += serviceFees.youngDriver;
    
    additionalServicesConfig.forEach(service => {
      if (service.id === 'ps5' && car.id !== 3) {
        return;
      }
      if (formData[service.id]) {
        total += service.fee;
      }
    });

    return { totalAmount: total, days: rentalDays, dailyPrice: currentDailyPrice };
  }, [formData, price, price3PlusDays, car.id]);

  const { totalAmount: currentItemTotal, days: rentalDays, dailyPrice } = useMemo(() => calculateCurrentItemTotal(), [calculateCurrentItemTotal]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedDeliveryOptionDetails = deliveryOptionsData.find(opt => opt.id === formData.deliveryOption);

    const cartItem = {
      car: car,
      pickupDate: formData.dateRange.from.toISOString().split('T')[0],
      returnDate: formData.dateRange.to.toISOString().split('T')[0],
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      deliveryOption: selectedDeliveryOptionDetails,
      youngDriver: formData.youngDriver,
      ...additionalServicesConfig.reduce((acc, service) => {
        if (service.id === 'ps5' && car.id !== 3) {
          return acc;
        }
        acc[service.id] = formData[service.id];
        return acc;
      }, {}),
      rentalDays: rentalDays,
      dailyPrice: dailyPrice,
    };

    addToCart(cartItem);
    setFormData(initialFormData);
  };

  const validateForm = useCallback(() => {
    if (!formData.dateRange.from || !formData.dateRange.to || !formData.name || !formData.phone) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля (Даты, Имя, Телефон).",
        variant: "destructive",
        icon: <AlertTriangle className="h-5 w-5 text-destructive-foreground" />,
      });
      return false;
    }

    if (formData.dateRange.to <= formData.dateRange.from) {
      toast({
        title: "Ошибка в датах",
        description: "Дата возврата должна быть позже даты получения.",
        variant: "destructive",
        icon: <AlertTriangle className="h-5 w-5 text-destructive-foreground" />,
      });
      return false;
    }
    return true;
  }, [formData.dateRange, formData.name, formData.phone, toast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="booking-form p-6 lg:p-8 shadow-xl rounded-lg bg-card border border-border/30"
    >
      <h3 className="text-2xl font-bold text-foreground mb-6 text-center md:text-left">Оформить аренду</h3>

      <form onSubmit={handleAddToCart} className="space-y-5">
        <div className="space-y-1.5">
          <Label className="flex items-center text-sm font-medium text-foreground">
            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
            Период аренды<span className="text-destructive ml-0.5">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${!formData.dateRange.from && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateRange.from ? (
                  formData.dateRange.to ? (
                    <>
                      {format(formData.dateRange.from, "d MMMM yyyy", { locale: ru })} -{" "}
                      {format(formData.dateRange.to, "d MMMM yyyy", { locale: ru })}
                    </>
                  ) : (
                    format(formData.dateRange.from, "d MMMM yyyy", { locale: ru })
                  )
                ) : (
                  <span>Выберите даты</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={formData.dateRange.from}
                selected={formData.dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={1}
                disabled={(date) => !canSelectDate(date)}
                locale={ru}
                modifiers={{
                  booked: (date) => isDateBooked(date)
                }}
                modifiersStyles={{
                  booked: {
                    color: 'var(--muted-foreground)',
                    textDecoration: 'line-through',
                    opacity: 0.5
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <FormInputGroup
          id="name" name="name" label="Полное имя" type="text"
          placeholder="Иванов Иван Иванович" value={formData.name}
          onChange={handleChange} required icon="User"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInputGroup
            id="phone" name="phone" label="Номер телефона" type="tel"
            placeholder="+7 (999) 000-00-00" value={formData.phone}
            onChange={handleChange} required icon="Phone"
          />
          <FormInputGroup
            id="email" name="email" label="Email адрес" type="email"
            placeholder="example@mail.ru" value={formData.email}
            onChange={handleChange} icon="Mail"
          />
        </div>

        <DeliveryOptionsGroup
          value={formData.deliveryOption}
          onChange={handleDeliveryChange}
          options={deliveryOptionsData}
        />

        <div className="space-y-3 pt-4 mt-4 border-t border-border/50">
          <Label className="flex items-center text-sm font-medium text-foreground mb-1">
            Дополнительные опции
          </Label>
          {additionalServicesConfig.map(service => (
            <AdditionalServiceCheckbox
              key={service.id}
              id={service.id}
              checked={formData[service.id]}
              onCheckedChange={(checked) => handleCheckboxChange(service.id, checked)}
              label={service.label}
              fee={service.fee}
              feeType={service.feeType}
              icon={service.iconKey}
              carId={car.id}
            />
          ))}
        </div>

        <div className="pt-5 border-t border-border/50">
          {rentalDays > 0 && (
            <PriceDetails
              rentalDays={rentalDays}
              dailyPrice={dailyPrice}
              deliveryOptionId={formData.deliveryOption}
              youngDriver={formData.youngDriver}
              additionalServices={formData}
              carId={car.id}
            />
          )}

          <Button type="submit" className="w-full text-base py-3 shadow-lg bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
            <ShoppingCart className="h-5 w-5 mr-2" /> Добавить в корзину
          </Button>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Вы сможете просмотреть и оформить все выбранные авто из корзины.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingForm;

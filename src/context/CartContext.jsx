import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { serviceFees, additionalServicesConfig } from '@/config/bookingOptions';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const calculateItemPrice = (item) => {
  console.log('calculateItemPrice: Incoming item:', item);

  // Defensive check: Ensure item and item.car are valid before proceeding
  if (!item || !item.car || typeof item.car.price === 'undefined') {
    console.error('Invalid item or car price in calculateItemPrice:', item);
    return 0; // Return 0 to prevent crash and indicate an invalid item
  }

  let rentalDays = 0;
  let currentDailyPrice = item.car.price;

  if (item.pickupDate && item.returnDate) {
    const pickup = new Date(item.pickupDate);
    const ret = new Date(item.returnDate);
    if (ret > pickup) {
      const diffTime = Math.abs(ret - pickup);
      rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (rentalDays === 0 && diffTime > 0) rentalDays = 1; 

      if (rentalDays >= 3 && item.car.price_3plus_days) {
        currentDailyPrice = item.car.price_3plus_days;
      } else if (rentalDays > 0) {
         currentDailyPrice = item.car.price;
      }
    }
  }
  console.log('calculateItemPrice: rentalDays:', rentalDays, 'currentDailyPrice:', currentDailyPrice);

  const rentalCost = currentDailyPrice * rentalDays;
  const deliveryCost = item.deliveryOption?.price || 0;
  console.log('calculateItemPrice: rentalCost:', rentalCost, 'deliveryCost:', deliveryCost);

  let additionalServicesCost = 0;

  // Add Young Driver cost if selected
  if (item.youngDriver && serviceFees.youngDriver) {
    additionalServicesCost += serviceFees.youngDriver;
    console.log('calculateItemPrice: Added youngDriver cost:', serviceFees.youngDriver, 'current total:', additionalServicesCost);
  }

  // Iterate through additionalServicesConfig to calculate costs
  additionalServicesConfig.forEach(service => {
    console.log('calculateItemPrice: Processing service:', service.id, 'item value:', item[service.id]);

    // Ensure service, service.id, service.fee, and service.feeType are defined
    if (!service || !service.id || typeof service.fee === 'undefined' || !service.feeType) {
      console.warn('Malformed service config detected:', service);
      return; // Skip malformed service
    }

    // Apply PS5 filtering for Li L7 (car.id === 3)
    if (service.id === 'ps5' && item.car.id !== 3) {
      console.log('calculateItemPrice: Skipping PS5 for car.id:', item.car.id);
      return; // Skip PS5 for non-Li L7 cars
    }

    if (item[service.id]) {
      const serviceCost = service.feeType === 'daily' ? service.fee * rentalDays : service.fee;
      additionalServicesCost += serviceCost;
      console.log('calculateItemPrice: Added service cost for', service.id, ':', serviceCost, 'current total:', additionalServicesCost);
    }
  });
  console.log('calculateItemPrice: Final additionalServicesCost:', additionalServicesCost);

  const totalPrice = rentalCost + deliveryCost + additionalServicesCost;
  console.log('calculateItemPrice: Final totalPrice:', totalPrice);

  return totalPrice;
};


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem('bazcarCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bazcarCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    console.log('addToCart: Item being added:', item);

    // Basic validation for essential fields before adding to cart
    if (!item.name || !item.phone || !item.pickupDate || !item.returnDate) {
        toast({
            title: "Неполные данные",
            description: "Пожалуйста, укажите имя, телефон и даты аренды.",
            variant: "destructive",
        });
        return; // Prevent adding to cart
    }


    setCartItems(prevItems => {
      console.log('addToCart: Current cart items (prevItems):', prevItems);
      const existingItemIndex = prevItems.findIndex(
        i =>
          i.car.id === item.car.id &&
          i.pickupDate === item.pickupDate &&
          i.returnDate === item.returnDate &&
          i.deliveryOption.id === item.deliveryOption.id &&
          i.youngDriver === item.youngDriver &&
          i.childSeat === item.childSeat &&
          i.personalDriver === item.personalDriver &&
          i.ps5 === item.ps5 &&
          i.transmission === item.transmission
      );
      console.log('addToCart: existingItemIndex:', existingItemIndex);

      if (existingItemIndex > -1) {
        toast({
          title: "Уже в корзине",
          description: "Эта конфигурация автомобиля уже добавлена. Вы можете изменить ее на странице корзины.",
          variant: "default",
        });
        return prevItems;
      }
      
      const newItemWithPrice = { 
        ...item, 
        id: Date.now(), 
        totalPrice: calculateItemPrice(item),
        rentalDays: item.rentalDays || (item.pickupDate && item.returnDate ? Math.ceil(Math.abs(new Date(item.returnDate) - new Date(item.pickupDate)) / (1000 * 60 * 60 * 24)) || 1 : 1),
        dailyPrice: item.dailyPrice,
        // transmission: item.transmission, // This property is already spread from `...item`
      };
      console.log('addToCart: New item with price:', newItemWithPrice);

      toast({
        title: "Добавлено в корзину!",
        description: `${item.car.name} добавлен в вашу корзину.`,
        variant: "success",
      });
      return [...prevItems, newItemWithPrice];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({
      title: "Удалено из корзины",
      description: "Товар удален из вашей корзины.",
      variant: "default",
    });
  };

  const updateCartItem = (itemId, updates) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, ...updates };
          return { ...updatedItem, totalPrice: calculateItemPrice(updatedItem) };
        }
        return item;
      })
    );
     toast({
      title: "Корзина обновлена",
      description: "Информация о товаре в корзине обновлена.",
      variant: "default",
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Корзина очищена",
      description: "Все товары удалены из вашей корзины.",
      variant: "default",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

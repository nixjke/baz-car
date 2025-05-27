
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const calculateItemPrice = (item) => {
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
  
  // Ensure rentalDays from item is used if dates are not set (e.g. quick add)
  // or if calculated rentalDays is 0 but item.rentalDays is positive
  if (item.rentalDays && (rentalDays === 0 || !item.pickupDate || !item.returnDate)) {
    rentalDays = item.rentalDays;
    if (rentalDays >= 3 && item.car.price_3plus_days) {
        currentDailyPrice = item.car.price_3plus_days;
    } else {
        currentDailyPrice = item.car.price;
    }
  }


  const rentalCost = currentDailyPrice * rentalDays;
  const deliveryCost = item.deliveryOption?.price || 0;
  const youngDriverCost = item.youngDriver ? 2000 : 0;
  
  let additionalServicesCost = 0;
  if (item.childSeat) additionalServicesCost += 1500; // childSeatFee
  if (item.personalDriver && rentalDays > 0) additionalServicesCost += 5000 * rentalDays; // personalDriverFee * rentalDays
  if (item.fullTank) additionalServicesCost += 4000; // fullTankFee

  return rentalCost + deliveryCost + youngDriverCost + additionalServicesCost;
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
      const existingItemIndex = prevItems.findIndex(
        i =>
          i.car.id === item.car.id &&
          i.pickupDate === item.pickupDate &&
          i.returnDate === item.returnDate &&
          i.deliveryOption.id === item.deliveryOption.id &&
          i.youngDriver === item.youngDriver &&
          i.childSeat === item.childSeat &&
          i.personalDriver === item.personalDriver &&
          i.ps5 === item.ps5
      );

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
        rentalDays: item.rentalDays || (item.pickupDate && item.returnDate ? Math.ceil(Math.abs(new Date(item.returnDate) - new Date(item.pickupDate)) / (1000 * 60 * 60 * 24)) || 1 : 1)
      };

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

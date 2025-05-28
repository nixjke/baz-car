
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Edit3, ShoppingBag, ArrowLeft, Info, Tag, Baby, UserCheck, Fuel } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleProceedToWhatsApp = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Пожалуйста, добавьте автомобили в корзину перед оформлением.",
        variant: "destructive",
      });
      return;
    }

    let message = "Здравствуйте! Хочу забронировать следующие автомобили BazCar:\n\n";
    let firstContactName = "";
    let firstContactPhone = "";
    let firstContactEmail = "";

    cartItems.forEach((item, index) => {
      if (index === 0) {
        firstContactName = item.name || 'Не указано';
        firstContactPhone = item.phone || 'Не указан';
        firstContactEmail = item.email || 'Не указан';
      }

      message += `ПОЗИЦИЯ ${index + 1}:\n`;
      message += `  Машина: ${item.car.name}\n`;
      message += `  Даты: ${item.pickupDate} - ${item.returnDate} (${item.rentalDays} дн.)\n`;
      message += `  Цена за день: ${item.dailyPrice.toLocaleString('ru-RU')} ₽\n`;
      if (item.deliveryOption && item.deliveryOption.price > 0) {
        message += `  Доставка: ${item.deliveryOption.label} (+${item.deliveryOption.price.toLocaleString('ru-RU')} ₽)\n`;
      } else if (item.deliveryOption) {
        message += `  Способ получения: ${item.deliveryOption.label}\n`;
      }
      if (item.youngDriver) {
        message += `  Молодой водитель: Да (+${2000 .toLocaleString('ru-RU')} ₽)\n`;
      }
      if (item.childSeat) {
        message += `  Детское кресло: Да (+${1500 .toLocaleString('ru-RU')} ₽)\n`;
      }
      if (item.personalDriver) {
        message += `  Личный водитель: Да (+${(5000 * item.rentalDays) .toLocaleString('ru-RU')} ₽)\n`;
      }
      if (item.ps5) {
        message += `  PlayStation 5: Да (+${(1000 * item.rentalDays) .toLocaleString('ru-RU')} ₽)\n`;
      }

      message += `  Стоимость позиции: ${item.totalPrice.toLocaleString('ru-RU')} ₽\n\n`;
    });

    message += `ОБЩАЯ СУММА ЗАКАЗА: ${getCartTotal().toLocaleString('ru-RU')} ₽\n`;
    message += `\nКонтактное лицо: ${firstContactName}\n`;
    message += `Телефон: ${firstContactPhone}\n`;
    message += `Email: ${firstContactEmail}\n`;


    const whatsappNumber = "+79894413888";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Запрос формируется",
      description: "Вы будете перенаправлены в WhatsApp для отправки деталей заказа.",
      variant: "default",
      duration: 7000,
    });
  };


  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }
  };
  
  return (
    <motion.div 
      className="py-16 bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity:0, y: -20}}
          animate={{ opacity:1, y: 0}}
          transition={{duration: 0.5}}
        >
          <h1 className="text-5xl font-extrabold text-foreground mb-3 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 mr-3 text-primary" /> Ваша Корзина BazCar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Проверьте выбранные автомобили и опции. Когда будете готовы, переходите к оформлению.
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-20 bg-card rounded-lg shadow-md border border-border/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="h-20 w-20 text-primary mx-auto mb-6 opacity-40" />
            <h2 className="text-3xl font-semibold text-foreground mb-3">Ваша корзина пуста</h2>
            <p className="text-muted-foreground mb-8">
              Похоже, вы еще не добавили ни одного автомобиля BazCar.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-primary-foreground">
              <Link to="/cars" className="flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2" /> К выбору автомобилей
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 }}}}
            >
              {cartItems.map(item => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card className="overflow-hidden shadow-lg border border-border/50 hover:shadow-primary/10 transition-shadow duration-300">
                    <CardHeader className="p-5 bg-secondary/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground">{item.car.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">ID Заказа: {item.id}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <p><strong className="text-foreground">Даты:</strong> {item.pickupDate} - {item.returnDate} ({item.rentalDays} дн.)</p>
                          <p><strong className="text-foreground">Цена за день:</strong> {item.dailyPrice.toLocaleString('ru-RU')} ₽</p>
                          {item.rentalDays >= 3 && <p className="text-green-600 text-xs"><Tag className="inline h-3 w-3 mr-1"/>Скидка за длит. аренду</p>}
                        </div>
                        <div>
                          <p><strong className="text-foreground">Доставка:</strong> {item.deliveryOption.label} ({item.deliveryOption.price > 0 ? `+${item.deliveryOption.price.toLocaleString('ru-RU')} ₽` : 'Бесплатно'})</p>
                          <p><strong className="text-foreground">Молодой водитель:</strong> {item.youngDriver ? `Да (+${2000 .toLocaleString('ru-RU')} ₽)` : 'Нет'}</p>
                        </div>
                      </div>
                      {(item.childSeat || item.personalDriver || item.fullTank) && (
                        <div className="mt-3 pt-3 border-t border-border/30">
                          <p className="font-semibold text-foreground mb-1.5">Доп. услуги:</p>
                          <ul className="space-y-0.5">
                            {item.childSeat && <li className="flex items-center text-muted-foreground"><Baby className="h-3.5 w-3.5 mr-1.5 text-primary/80"/>Детское кресло (+{1500 .toLocaleString('ru-RU')} ₽)</li>}
                            {item.personalDriver && <li className="flex items-center text-muted-foreground"><UserCheck className="h-3.5 w-3.5 mr-1.5 text-primary/80"/>Личный водитель (+{(5000 * item.rentalDays) .toLocaleString('ru-RU')} ₽)</li>}
                            {item.fullTank && <li className="flex items-center text-muted-foreground"><Fuel className="h-3.5 w-3.5 mr-1.5 text-primary/80"/>Полный бак (+{4000 .toLocaleString('ru-RU')} ₽)</li>}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-5 bg-secondary/30 flex justify-between items-center">
                       <Link to={`/cars/${item.car.id}?edit=${item.id}`} className="text-xs text-primary hover:underline flex items-center">
                         <Edit3 className="h-3.5 w-3.5 mr-1.5" /> Изменить параметры
                       </Link>
                      <p className="text-lg font-semibold text-primary">
                        Итого: {item.totalPrice.toLocaleString('ru-RU')} ₽
                      </p>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="lg:col-span-1 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="shadow-xl border-border/50">
                <CardHeader className="p-6">
                  <CardTitle className="text-2xl font-bold text-foreground text-center">Сумма заказа</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between text-md">
                    <span className="text-muted-foreground">Позиций в корзине:</span>
                    <span className="font-semibold text-foreground">{cartItems.length}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-medium text-foreground">Общая стоимость:</span>
                    <span className="font-bold text-primary text-2xl">{getCartTotal().toLocaleString('ru-RU')} ₽</span>
                  </div>
                   <div className="text-xs text-muted-foreground pt-2 flex items-start">
                      <Info size={16} className="mr-2 mt-0.5 shrink-0 text-primary/80" />
                      <span>Контактные данные (имя, телефон, email) будут взяты из первой добавленной позиции в корзине для общего заказа.</span>
                   </div>
                </CardContent>
                <CardFooter className="p-6 flex flex-col space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full text-base py-3 shadow-lg bg-gradient-to-r from-primary to-green-400 hover:from-primary/90 hover:to-green-400/90 text-primary-foreground"
                    onClick={handleProceedToWhatsApp}
                  >
                    Оформить через WhatsApp
                  </Button>
                  <Button variant="outline" size="lg" onClick={clearCart} className="w-full border-destructive/50 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4 mr-2" /> Очистить корзину
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;

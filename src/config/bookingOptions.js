export const deliveryOptionsData = [
  { id: "pickup", label: "Самовывоз", price: 0, iconKey: "Users2" },
  { id: "city", label: "Доставка по городу", price: 700, iconKey: "Truck" },
  { id: "airport", label: "Доставка в аэропорт", price: 1000, iconKey: "Truck" },
];

export const serviceFees = {
  youngDriver: 5000,
  childSeat: 700,
  personalDriver: 6000,
  ps5: 1000,
  transmission: 4000
};

export const additionalServicesConfig = [
  {
    id: "youngDriver",
    label: "Молодой водитель (18-21 год)",
    description: "Дополнительная опция для водителей в возрасте от 18 до 21 года. Обеспечивает полное страховое покрытие.",
    fee: serviceFees.youngDriver,
    feeType: "fixed",
    iconKey: "User",
  },
  {
    id: "childSeat",
    label: "Детское кресло",
    description: "Безопасность и комфорт для ваших маленьких пассажиров. Устанавливается по запросу.",
    fee: serviceFees.childSeat,
    feeType: "fixed",
    iconKey: "Baby",
  },
  {
    id: "personalDriver",
    label: "Личный водитель",
    description: "Наслаждайтесь поездкой, доверив управление профессионалу. Идеально для деловых поездок или экскурсий.",
    fee: serviceFees.personalDriver,
    feeType: "fixed",
    iconKey: "UserCheck",
  },
  {
    id: "ps5",
    label: "PlayStation 5",
    description: "Развлечения в дороге для детей и взрослых. В вашем распоряжении PS5 с предустановленной коллекцией популярных игр - готовые решения для любого настроения!",
    fee: serviceFees.ps5,
    feeType: "fixed",
    iconKey: "Gamepad2",
  },
  {
    id: "transmission",
    label: "Передача руля",
    description: "Возможность передать управление автомобилем другому водителю. Идеально для длительных поездок с компанией.",
    fee: serviceFees.transmission,
    feeType: "fixed",
    iconKey: "Settings",
  },
];

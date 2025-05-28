
export const deliveryOptionsData = [
  { id: "pickup", label: "Самовывоз", price: 0, iconKey: "Users2" },
  { id: "city", label: "Доставка по городу", price: 700, iconKey: "Truck" },
  { id: "airport", label: "Доставка в аэропорт", price: 1000, iconKey: "Truck" },
];

export const serviceFees = {
  youngDriver: 2000,
  childSeat: 700,
  personalDriver: 5000,
  ps5: 1000
};

export const additionalServicesConfig = [
  {
    id: "youngDriver",
    label: "Молодой водитель (18-21 год)",
    fee: serviceFees.youngDriver,
    feeType: "fixed",
    iconKey: "User",
  },
  {
    id: "childSeat",
    label: "Детское кресло",
    fee: serviceFees.childSeat,
    feeType: "fixed",
    iconKey: "Baby",
  },
  {
    id: "personalDriver",
    label: "Личный водитель",
    fee: serviceFees.personalDriver,
    feeType: "daily",
    iconKey: "UserCheck",
  },
  {
    id: "ps5",
    label: "PlayStation 5",
    fee: serviceFees.ps5,
    feeType: "daily",
    iconKey: "Gamepad2",
  },
];

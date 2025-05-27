
export const deliveryOptionsData = [
  { id: "pickup", label: "Самовывоз", price: 0, iconKey: "Users2" },
  { id: "city", label: "Доставка по городу", price: 700, iconKey: "Truck" },
  { id: "airport", label: "Доставка в аэропорт", price: 1000, iconKey: "Truck" },
];

export const serviceFees = {
  youngDriver: 2000, // fixed
  childSeat: 1500,   // fixed, per rental
  personalDriver: 5000, // per day
  fullTank: 4000,    // fixed, per rental
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
    id: "fullTank",
    label: "Полный бак бензина",
    fee: serviceFees.fullTank,
    feeType: "fixed",
    iconKey: "Fuel",
  },
];

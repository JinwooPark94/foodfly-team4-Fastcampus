export interface OrderList {
  restaurantPk: number;
  menus: Menus;
  account: number;
}

export interface Menus {
  pk: number;
  name: string;
  price: number;
  amount: number;
}

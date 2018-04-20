export interface Menus {
  pk: number;
  name: string;
  price: number;
  amount: number;
}

export interface OrderAllList {
  restaurantPk: number;
  restaurantName: string;
  menus: Menus[];
  account: number;
}

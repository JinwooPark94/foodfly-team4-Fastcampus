import { Injectable } from '@angular/core';
import { OrderList } from '../../core/interface/foodorder.interface';


@Injectable()
export class FoodorderService {

  orderlist: OrderList[] = [];

  orderSum: number;

  minOrderPrice = 30000;

  constructor() { }

  checkOrderList(orderedItem: OrderList) {
    const MatchId = this.orderlist.find(item => item.id === orderedItem.id);

    if (MatchId) {
      return this.addAmount(orderedItem.id);
    } else {
      return this.addOrder(orderedItem);
    }
  }

  addOrder(orderedItem: OrderList) {
    this.orderlist = [...this.orderlist,
    { id: orderedItem.id, name: orderedItem.name, price: orderedItem.price, amount: orderedItem.amount }];
  }

  addAmount(id: number) {
    this.orderlist = this.orderlist.map(order => order.id === id ? Object.assign({}, order, { amount: order.amount + 1 }) : order);
  }

  minusAmount(order: OrderList) {
    if (order.amount <= 1) {
      return;
    } else {
      this.orderlist = this.orderlist.map(orderedItem => orderedItem.id === order.id ?
        Object.assign({}, orderedItem, { amount: orderedItem.amount - 1 }) : orderedItem);
    }
  }

  removeToOrder(id: number) {
    this.orderlist = this.orderlist.filter(order => order.id !== id);
  }

  orderSumCulator() {
    const orderMidSum = this.orderlist.map(orderedItem => orderedItem.price * orderedItem.amount);

    if (this.orderlist.length) {
      return this.orderSum = orderMidSum.reduce((accumulator, currentValue) => accumulator + currentValue);
    } else {
      return this.orderSum = 0;
    }
  }

}

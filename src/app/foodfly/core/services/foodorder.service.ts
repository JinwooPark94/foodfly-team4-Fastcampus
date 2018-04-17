import { Injectable } from '@angular/core';
import { OrderList } from '../../core/interface/foodorder.interface';

@Injectable()
export class FoodorderService {

  orderlist: OrderList[] = [];

  orderSum: number;

  minOrderPrice = 30000;

  cartData;

  constructor() {
    // 장바구니에 데이터가 있으면 주문표에 값 넣기
    if (this.getSessionData()) {
      this.orderlist = this.getOrderlistData();
    }
  }

  // 장바구니 list에 메뉴가 들어가 있는지 확인 후 개수 리턴
  getSessionData() {
    this.cartData = JSON.parse(sessionStorage.getItem('sessionStorage-cart'));

    if (!this.cartData) { return 0; }
    return this.cartData.orderList.length;
  }

  // sessionStorage에 있는 메뉴가 있을 시 값 리턴
  getOrderlistData() {
    if (!this.cartData.orderList) { return 0; }
    return this.cartData.orderList;
  }

  // 주문표 안에 값이 들어가면 자동으로 session안에 장바구니 데이터 저장
  setFoodOrderStorage() {
    console.log(this.orderlist);
    const foodOrderList = {
      restaurantPn: '아리랑',
      orderList: [...this.orderlist],
      orderSum: this.orderSum
    };
    sessionStorage.setItem('sessionStorage-cart', JSON.stringify(foodOrderList));
  }

  orderSumCulator() {
    const orderMidSum = this.orderlist.map(orderedItem => orderedItem.price * orderedItem.amount);

    if (this.orderlist.length) {
      return this.orderSum = orderMidSum.reduce((accumulator, currentValue) => accumulator + currentValue);
    } else {
      return this.orderSum = 0;
    }
  }
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

    console.log(this.orderlist);
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

  removeAllOrder() {
    this.orderlist = [];
  }


}

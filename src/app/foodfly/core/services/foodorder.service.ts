import { Injectable } from '@angular/core';
import { OrderList } from '../../core/interface/foodorder.interface';

@Injectable()
export class FoodorderService {

  orderlist: OrderList[] = [];

  orderSum: number;

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


  // 메뉴 합계
  orderSumCulator() {
    const orderMidSum = this.orderlist.map(orderedItem => orderedItem.price * orderedItem.amount);

    if (this.orderlist.length) {
      return this.orderSum = orderMidSum.reduce((accumulator, currentValue) => accumulator + currentValue);
    } else {
      return this.orderSum = 0;
    }
  }

  // 주문표에 메뉴추가 (메뉴가 있다면 수량 + 1)
  checkOrderList(orderedItem: OrderList) {
    const MatchPk = this.orderlist.find(item => item.pk === orderedItem.pk);

      if (MatchPk) {
          return this.addAmount(orderedItem.pk);
        } else {
        return this.addOrder(orderedItem);
      }
  }

  addOrder(orderedItem: OrderList) {
    this.orderlist = [...this.orderlist,
      { pk: orderedItem.pk, name: orderedItem.name, price: orderedItem.price, amount: 1 }];

    console.log(this.orderlist);
  }

  addAmount(pk: number) {
    this.orderlist = this.orderlist.map(order => order.pk === pk ? Object.assign({}, order, { amount: order.amount + 1 }) : order);
  }

  minusAmount(order: OrderList) {
    if (order.amount <= 1) {
        return;
      } else {
        this.orderlist = this.orderlist.map(orderedItem => orderedItem.pk === order.pk ?
            Object.assign({}, orderedItem, { amount: orderedItem.amount - 1 }) : orderedItem);
      }
  }

  removeToOrder(pk: number) {
    this.orderlist = this.orderlist.filter(order => order.pk !== pk);
  }

  removeAllOrder() {
    this.orderlist = [];
  }

}

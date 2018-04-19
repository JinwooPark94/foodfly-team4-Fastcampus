import { Injectable } from '@angular/core';
import { OrderList, Menus } from '../../core/interface/foodorder.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class FoodorderService {

  orderlist: Menus[] = [];

  orderInfo: OrderList;

  account: number;

  cartData;

  restaurantPk: number;

  constructor(private route: ActivatedRoute) {
    // url에 레스토랑 고유번호 저장
    this.restaurantPk = Number.parseInt(this.route.snapshot.paramMap.get('pk'));

    // 장바구니에 데이터가 있으면 주문표에 값 넣기
    if (this.getSessionData()) {
      this.orderlist = this.getOrderlistData();
    }
  }

  // 장바구니 list에 메뉴가 들어가 있는지 확인 후 개수 리턴
  getSessionData() {
    this.cartData = JSON.parse(sessionStorage.getItem('sessionStorage-cart'));

    if (!this.cartData) { return 0; }
    this.orderInfo = this.cartData;
    return this.cartData.menus.length;
  }

  // sessionStorage에 있는 메뉴가 있을 시 값 리턴
  getOrderlistData() {
    if (!this.cartData.menus) { return []; }
    if (this.restaurantPk !== this.orderInfo.restaurantPk) { return []; }
    return this.cartData.menus;
  }

  // 주문표 안에 값이 들어가면 자동으로 session안에 장바구니 데이터 저장
  setFoodOrderStorage(restaurantName: string) {
    if (this.restaurantPk !== this.orderInfo.restaurantPk) { return ; }

    const foodOrderList = {
      restaurantName,
      restaurantPk: this.restaurantPk,
      menus: [...this.orderlist],
      account: this.account
    };
    sessionStorage.setItem('sessionStorage-cart', JSON.stringify(foodOrderList));
  }


  // 메뉴 합계
  orderSumCulator() {
    const orderMidSum = this.orderlist.map(orderedItem => orderedItem.price * orderedItem.amount);

    if (this.orderlist.length) {
      return this.account = orderMidSum.reduce((accumulator, currentValue) => accumulator + currentValue);
    } else {
      return this.account = 0;
    }
  }

  // 주문표에 메뉴추가 (메뉴가 있다면 수량 + 1)
  checkOrderList(orderedItem: Menus) {
    const MatchPk = this.orderlist.find(item => item.pk === orderedItem.pk);

      if (MatchPk) {
          return this.addAmount(orderedItem.pk);
        } else {
        return this.addOrder(orderedItem);
      }
  }

  addOrder(orderedItem: Menus) {
    if (this.restaurantPk !== this.orderInfo.restaurantPk) {
      if (confirm('장바구니 데이터를 초기화 하시겠습니까?')) {
        this.orderInfo.restaurantPk = this.restaurantPk;
      } else { return; }
    }
    this.orderlist = [...this.orderlist,
      { pk: orderedItem.pk, name: orderedItem.name, price: orderedItem.price, amount: 1 }];
  }

  addAmount(pk: number) {
    this.orderlist = this.orderlist.map(order => order.pk === pk ? Object.assign({}, order, { amount: order.amount + 1 }) : order);
  }

  minusAmount(order: Menus) {
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

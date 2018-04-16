import { Injectable } from '@angular/core';
import { OrderList } from '../../core/interface/foodorder.interface';

@Injectable()
export class FoodorderService {

  orderlist: OrderList[] = [];

  orderSum: number;

  minOrderPrice = 30000;


  cartData;

  constructor() { }

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

}

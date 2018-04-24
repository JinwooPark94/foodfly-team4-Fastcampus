import { Injectable } from '@angular/core';
import { OrderAllList, Menus } from '../../core/interface/foodorder.interface';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from './toastr.service';

@Injectable()
export class FoodorderService {

  orderlist: Menus[] = [];

  orderInfo: OrderAllList;

  account: number;

  diveryprice: number;

  restaurantPk: number;

  cartSessionData: OrderAllList;

  constructor(private route: ActivatedRoute, private toastrService: ToastrService) {
    // 레스토랑 초기 값 지정
    this.restaurantPk = Number.parseInt(route.snapshot.paramMap.get('pk'));

    // 세션으로 부터 장바구니 정보를 가져옴
    this.cartSessionData = JSON.parse(sessionStorage.getItem('sessionStorage-cart'));

    // 장바구니에 데이터가 있으면 주문표에 값 넣기
    // 세션에 데이터가 있을 시 orderlist에 저장
    if (this.getSessionData()) {
      this.orderlist = this.getOrderlistData();
    }
  }

  // 장바구니 list에 메뉴가 들어가 있는지 확인 후 개수 리턴
  getSessionData() {
    this.cartSessionData = JSON.parse(sessionStorage.getItem('sessionStorage-cart'));

    // 값이 없을 시 0을 리턴
    if (!this.cartSessionData) { return 0 ; }

    // 세션에 있는 데이터 저장
    this.orderInfo = this.cartSessionData;
    return this.cartSessionData.menus.length;
  }

  // sessionStorage에 있는 메뉴가 있을 시 값 리턴
  getOrderlistData() {
    if (!this.cartSessionData) { return []; }

    if (this.orderInfo) {
      if (this.restaurantPk !== this.orderInfo.restaurantPk) { return []; }
    }
    return this.cartSessionData.menus;
  }

  // 주문표 안에 값이 들어가면 자동으로 session안에 장바구니 데이터 저장
  setFoodOrderStorage(restaurantName: string) {
    this.cartSessionData = JSON.parse(sessionStorage.getItem('sessionStorage-cart'));

    if (this.cartSessionData && this.orderInfo) {
      if (this.orderInfo.menus.length && this.restaurantPk !== this.orderInfo.restaurantPk) { return; }
    }

    const foodOrderList = {
      restaurantName,
      restaurantPk: this.restaurantPk,
      menus: [...this.orderlist],
      deliverytip: this.diveryprice,
      account: this.orderSumCulator(this.diveryprice)
    };

    this.orderInfo = foodOrderList;

    sessionStorage.setItem('sessionStorage-cart', JSON.stringify(foodOrderList));
  }


  // 메뉴 합계
  orderSumCulator(diveryprice: number) {
    const orderMidSum = this.orderlist.map(orderedItem => orderedItem.price * orderedItem.amount);

    if (this.orderlist.length) {
      return orderMidSum.reduce((accumulator, currentValue) => accumulator + currentValue) + diveryprice;
    } else {
      return 0;
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
    console.log(this.orderInfo);
    if (this.orderInfo) {
      if (this.restaurantPk !== this.orderInfo.restaurantPk) {
        if (confirm('장바구니 데이터를 초기화 하시겠습니까?')) {
          sessionStorage.removeItem('sessionStorage-cart');
        } else { return; }
      }
    }
    this.orderlist = [...this.orderlist,
      { pk: orderedItem.pk, name: orderedItem.name, price: orderedItem.price, amount: 1 }];
    this.toastrService.messageAdd('메뉴가 추가되었습니다.', 'orderToCart');
  }

  addAmount(pk: number) {
    this.orderlist = this.orderlist.map(order => order.pk === pk ? Object.assign({}, order, { amount: order.amount + 1 }) : order);
    this.toastrService.messageAdd('수량이 +1 추가되었습니다.', 'orderToCart');
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

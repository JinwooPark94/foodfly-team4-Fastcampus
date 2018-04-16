import { Component, OnInit, IterableDiffers, DoCheck } from '@angular/core';

import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { FoodorderService } from '../../../core/services/foodorder.service';

interface FoodList {
  id: number;
  name: string;
  price: number;
  amount: number;
}
interface OrderList {
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Component({
  selector: 'foodfly-foodorder',
  templateUrl: './foodorder.component.html',
  styleUrls: ['./foodorder.component.css'],
  animations: [
    trigger('accordion', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ height: 0 }),
        animate(200, style({ height: '*' }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({ height: 0 }))
      ])
    ])
  ]
})
export class FoodorderComponent implements OnInit, DoCheck {
  navItems: string[] = ['메뉴', '정보', '리뷰'];

  selectedItem: string;

  orderlist: OrderList[] = [];

  orderSum: number;

  foodlist: FoodList[] = [
    { id: 1, name: '안동찜닭', price: 25000, amount: 1 },
    { id: 2, name: '후라이드', price: 15000, amount: 1 },
    { id: 3, name: '양념치킨', price: 16000, amount: 1 }
  ];

  minOrderPrice = 30000;

  subMenu = false;

  sideMenu = false;

  constructor(private differs: IterableDiffers, private foodorderService: FoodorderService) {

    // 장바구니에 데이터가 있으면 주문표에 값 넣기
    if (this.foodorderService.getSessionData()) {
      this.orderlist = this.foodorderService.getOrderlistData();
    }
  }

  ngOnInit() {
    this.selectedItem = this.navItems[0];
  }

  // orderlist 배열을 확인하여 값이 바뀌면 실행
  ngDoCheck() {
    const changes = this.differs.find(this.orderlist);
    if (changes) {
      this.setFoodOrderStorage();
    }
  }

  changeNavItem(navItem: string) {
    this.selectedItem = navItem;
  }

  checkOrderId(order: OrderList) {
  }

  addToOrder(orderedItem: OrderList) {
    const MatchId = this.orderlist.filter(item => item.id === orderedItem.id);

    if (MatchId.length) {
        return this.addAmount(orderedItem.id);
      } else {
        return this.orderlist = [...this.orderlist,
        { id: orderedItem.id, name: orderedItem.name, price: orderedItem.price, amount: orderedItem.amount }];
      }
  }

  addAmount(id: number) {
    this.orderlist = this.orderlist.map(order => order.id === id ? Object.assign({}, order, { amount: order.amount + 1 }) : order);
  }

  minusAmount(id: number) {
    this.orderlist = this.orderlist.map(order => order.id === id ? Object.assign({}, order, { amount: order.amount - 1 }) : order);
  }

  removeToOrder(id: number) {
    this.orderlist = this.orderlist.filter(order => order.id !== id);
  }

  orderlistSum() {
    const orderMidSum = this.orderlist.map(orderedItem => orderedItem.price * orderedItem.amount);

    if (this.orderlist.length) {
      return this.orderSum = orderMidSum.reduce((accumulator, currentValue) => accumulator + currentValue);
    } else {
      return this.orderSum = 0;
    }
  }

  // 주문표 안에 값이 들어가면 자동으로 session안에 장바구니 데이터 저장
  setFoodOrderStorage() {
    const foodOrderList = {
      restaurantPn: '아리랑' ,
      orderList: [...this.orderlist],
      orderSum: this.orderlistSum()
    };
    sessionStorage.setItem('sessionStorage-cart', JSON.stringify(foodOrderList));
  }
}


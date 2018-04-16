import { Component, OnInit } from '@angular/core';

import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

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
export class FoodorderComponent implements OnInit {
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

  constructor() {
   }

  ngOnInit() {
    this.selectedItem = this.navItems[0];
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

  foodOrderSubmit() {
    const foodOrderList = [
      { 'restaurantPn': '아리랑' },
      ...this.orderlist,
      { 'orderSum': this.orderlistSum() }];
    sessionStorage.setItem('sessionStorage-cart', JSON.stringify(foodOrderList));
  }
}


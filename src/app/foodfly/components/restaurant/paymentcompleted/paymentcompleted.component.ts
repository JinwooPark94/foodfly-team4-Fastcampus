import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foodfly-paymentcompleted',
  templateUrl: './paymentcompleted.component.html',
  styleUrls: ['./paymentcompleted.component.css']
})
export class PaymentcompletedComponent implements OnInit {
  cart;
  searchInfo;

  constructor() { }

  ngOnInit() {
    // 사용자 정보 가져오기
    this.cart = JSON.parse(sessionStorage.getItem('sessionStorage-cart'));
    this.searchInfo = JSON.parse(sessionStorage.getItem('sessionStorage-searchInfo'));

    // 카트 세션 { restaurantName: "퀴즈노스 강남구청역점", restaurantPk: 20970, menus: Array(1), account: 9900 }
    console.log('카트 세션', this.cart);
    // 위치 인포 세션 { address: "서울특별시 강남구 논현로123길 35-1", lat: 37.5108295, lag: 127.02928809999999 }
    console.log('위치 인포 세션', this.searchInfo);

    this.sessionClear();
  }

  sessionClear() {
    sessionStorage.removeItem('sessionStorage-cart');
    sessionStorage.removeItem('sessionStorage-orderPost');
    console.log('cart 세션 클리어');
  }

}

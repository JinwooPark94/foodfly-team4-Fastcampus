import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, CanActivate } from '@angular/router';
import { ToastrService } from '../services/toastr.service';

@Injectable()
export class SessionGuard implements CanActivate {

  currentUrl: string[];

  constructor(private router: Router, private location: Location, private toastrService: ToastrService) { }

  canActivate() {
    this.currentUrl = this.location.path().split('/');

    // 레스토랑 리스트 페이지 접근
    if (this.currentUrl[2] === 'foodlist' || this.currentUrl[2] === 'foodorder') {
      if (!this.sessionSearch) {
        this.toastrService.messageAdd('잘못된 접근입니다.', 'warning');
        this.router.navigate(['main']);
        return false;
      }
    // 레스토랑 주문하기 페이지 접근
    } else if (this.currentUrl[2] === 'checkout' || this.currentUrl[2] === 'paymentcompleted') {
      if (!this.sessionSearch && !this.sessionCartdata) {
        this.toastrService.messageAdd('잘못된 접근입니다.', 'warning');
        this.router.navigate(['main']);
        return false;
      }
    }
    return true;
  }

  get sessionSearch() {
    return sessionStorage.getItem('sessionStorage-searchInfo');
  }

  get sessionCartdata() {
    return sessionStorage.getItem('sessionStorage-cart');
  }
}

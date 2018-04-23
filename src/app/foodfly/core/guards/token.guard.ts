import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from '../services/toastr.service';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private router: Router, private auth: LoginService, private toastrService: ToastrService) { }

  canActivate() {
    // 토큰 유효 기간 확인
    if (!this.auth.isAuthenticated()) {
      console.log('[AuthGuard] invalid token!');
      this.toastrService.messageAdd('잘못된 접근입니다', 'warning');
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
}

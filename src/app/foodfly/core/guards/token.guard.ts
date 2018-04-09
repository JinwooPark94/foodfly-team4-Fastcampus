import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private router: Router, private auth: LoginService) { }

  canActivate() {
    // 토큰 유효 기간 확인
    if (!this.auth.isAuthenticated()) {
      console.log('[AuthGuard] invalid token!');
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
}

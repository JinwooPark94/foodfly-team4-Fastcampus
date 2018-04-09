import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { Token } from '../interface/token.interface';
import { User } from '../interface/user.interface';

import { JwtHelper } from 'angular2-jwt';
import { SocialLoginService } from './social-login.service';

import { environment } from '../../../../environments/environment';

@Injectable()
export class LoginService {
  URL = `${environment.apiUrl}`;
  TOKEN_NAME = environment.tokenName;
  userId: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper,
    private socialAuth: SocialLoginService) {}

  signin(credential: User): Observable<Token> {
    return this.http.post<Token>(`${this.URL}/user/login/`, credential)
      .do(res => {
        this.setToken(res.token);
        console.dir(res);
      })
      .shareReplay();
  }

  socialSignin(provider: string): Observable<Token> {
    return this.socialAuth.getSocialCredential(provider)
      .switchMap(credential => this.http.post<Token>(`${this.URL}/user/facebook-login/`, credential))
      .do(res => {
        this.setToken(res.token);
        console.dir(res);
      })
      .shareReplay();
  }

  signout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  // 토큰으로부터 사용자 아이디 취득
  getUserid(): string {
    // console.log(this.getDecodeToken());
    return this.getDecodeToken().userid;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  /*
  The JwtHelper class has several useful methods that can be utilized in your components:

  decodeToken
  getTokenExpirationDate
  isTokenExpired

  npm install angular2-jwt
  https://github.com/auth0/angular2-jwt
  */

  // token 유효 기간 체크
  isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }

  // 토큰으로부터 사용자 정보 취득
  getDecodeToken() {
    return this.jwtHelper.decodeToken(this.getToken());
  }
}

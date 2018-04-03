import { Component, OnInit } from '@angular/core';
import { LoginData } from '../../../core/interface/login.interface';

@Component({
  selector: 'foodfly-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: LoginData[] = [
    { email: 'wlsdntus2@naver.com', password: '123' },
    { email: 'jinwoo@ancle.kr', password: '123' }
  ];
  loginGetData: LoginData[];
  message: string;

  ngOnInit() {

  }

  login(userid: string, userpw: string) {
    this.loginGetData = this.loginData.filter(logindata => {
      return (userid === logindata.email && userpw === logindata.password);
    });
    (this.loginGetData.length) ? this.message = '로그인에 성공하였습니다.' : this.message = '아이디/비밀번호가 잘못되었습니다.';
  }

}


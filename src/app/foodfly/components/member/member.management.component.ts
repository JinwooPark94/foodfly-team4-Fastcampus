import { Component, OnInit } from '@angular/core';

import { User } from '../../core/interface/user.interface';

@Component({
  selector: 'foodfly-member',
  template: ''
})

export class MemberManagementComponent implements OnInit {


  loginData: User[] = [
    { email: 'wlsdntus2@naver.com', password: '1234' },
    { email: 'jinwoo@ancle.kr', password: '1234' }
  ];

  constructor() { }

  ngOnInit() {
  }



}

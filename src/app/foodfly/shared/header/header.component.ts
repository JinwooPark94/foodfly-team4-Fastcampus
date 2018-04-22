import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/services/login.service';
import { ToastrService } from '../../core/services/toastr.service';
import { FoodorderService } from '../../core/services/foodorder.service';

@Component({
  selector: 'foodfly-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userid: string;

  constructor(private auth: LoginService,
              private toastrService: ToastrService,
              public foodorderService: FoodorderService,
              private router: Router ) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.userid = this.auth.getUserid();
    }
  }

  signout() {
    this.auth.signout();
    this.toastrService.messageAdd('로그아웃 되었습니다.', 'success');
    this.router.navigate(['main']);
  }

}

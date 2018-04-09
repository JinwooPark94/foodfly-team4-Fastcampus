import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'foodfly-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userid: string;

  constructor(private auth: LoginService, private router: Router ) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.userid = this.auth.getUserid();
    }
  }

  signout() {
    this.auth.signout();
    this.router.navigate(['main']);
  }

}

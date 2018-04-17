import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../member/password.validator';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../core';

@Component({
  selector: 'foodfly-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ]),
    trigger('accordion', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ height: 0 }),
        animate(500, style({ height: '*' }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ height: 0 }))
      ])
    ])
  ]
})
export class AccountComponent implements OnInit {
  apiUrl = `${environment.apiUrl}`;

  message: string;
  usermodifyform: FormGroup;

  userData;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private loginService: LoginService) {}

  ngOnInit() {

    // 사용자 정보 가져오기
    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.loginService.getToken()}`);

    this.http.get(`${this.apiUrl}/members/profile/`, { headers } )
      .subscribe(data => {
        console.log(data);
        this.userData = data;
      });

    console.log(this.userData);
    this.usermodifyform = this.fb.group({
      passwordGroup: this.fb.group({
        userpassword: ['', [
          Validators.required,
          Validators.pattern(/[a-zA-Z0-9!@#$%^&+=]/),
          Validators.minLength(8),
          Validators.maxLength(16)
        ]],
        userconfirmPassword: ['', Validators.required]
      }, { validator: PasswordValidator.match }),
      userphonenumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(9),
        Validators.maxLength(11)
      ]]
    });
    console.dir(this.usermodifyform);
  }

  get useremail() {
    return this.usermodifyform.get('useremail');
  }

  get passwordGroup() {
    return this.usermodifyform.get('passwordGroup');
  }

  get userpassword() {
    return this.usermodifyform.get('passwordGroup.userpassword');
  }

  get userconfirmPassword() {
    return this.usermodifyform.get('passwordGroup.userconfirmPassword');
  }

  get username() {
    return this.usermodifyform.get('username');
  }

  get userphonenumber() {
    return this.usermodifyform.get('userphonenumber');
  }

  modify() {

  }

}

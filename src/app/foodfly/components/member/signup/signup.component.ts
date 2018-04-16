import { Component, Input , OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../password.validator';

import { ToastService } from '../../../core/services/toast.service';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'foodfly-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
export class SignupComponent implements OnInit {

  userform: FormGroup;

  apiUrl = `${environment.apiUrl}`;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private toastService: ToastService) {}

  ngOnInit() {
    this.userform = this.fb.group({
      useremail: ['', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      passwordGroup: this.fb.group({
        userpassword: ['', [
          Validators.required,
          Validators.pattern(/[a-zA-Z0-9!@#$%^&+=]/),
          Validators.minLength(8),
          Validators.maxLength(16)
        ]],
        userconfirmPassword: ['', Validators.required]
      }, { validator: PasswordValidator.match }),
      username: ['', [
        Validators.required,
        Validators.pattern(/^[\d가-힣A-Za-z]+$/)
      ]],
      userphonenumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(11)
      ]]
    });
  }

  get useremail() {
    return this.userform.get('useremail');
  }

  get passwordGroup() {
    return this.userform.get('passwordGroup');
  }

  get userpassword() {
    return this.userform.get('passwordGroup.userpassword');
  }

  get userconfirmPassword() {
    return this.userform.get('passwordGroup.userconfirmPassword');
  }

  get username() {
    return this.userform.get('username');
  }

  get userphonenumber() {
    return this.userform.get('userphonenumber');
  }

  signup() {
    let userPhoneNum = this.userform.value.userphonenumber;
    userPhoneNum = `+82 ${userPhoneNum.substring(0, 3)}-${userPhoneNum.substring(3, 7)}-${userPhoneNum.substring(7, 11)}`;

    const userData = {
      'email': this.userform.value.useremail,
      'password': this.userform.value.passwordGroup.userpassword,
      'passwordConfirm': this.userform.value.passwordGroup.userconfirmPassword,
      'name': this.userform.value.username,
      'phoneNumber': userPhoneNum
    };

    this.http
      .post(`${this.apiUrl}/members/signup/`, userData)
      .subscribe( data => {
        this.router.navigate(['member/login']);
        this.toastService.messageAdd('회원가입이 완료되었습니다.', 'success');
      });
  }
}


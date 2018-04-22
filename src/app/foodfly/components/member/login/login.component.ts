import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService, SocialLoginService, ToastrService } from './../../../core';

@Component({
  selector: 'foodfly-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  message: string;
  form: FormGroup;

  constructor(
    private formBilder: FormBuilder,
    private router: Router,
    private auth: LoginService,
    private socialAuth: SocialLoginService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.formBilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/[a-zA-Z0-9]/),
        Validators.minLength(4),
        Validators.maxLength(16)
      ]]
    });
  }

  signin() {
    this.auth.signin(this.form.value)
      .subscribe(
        () => {
          this.router.navigate(['main']);
          this.toastrService.messageAdd('로그인 되었습니다.', 'success');
        },
        ({ error }) => {
          this.message = error.message;
          this.toastrService.messageAdd('아이디와 비밀번호를 다시 확인해주세요.', 'warning');
        });
  }

  socialSignin(provider: string) {
    this.auth.socialSignin(provider)
      .subscribe(
        () => {
          this.router.navigate(['main']);
          this.toastrService.messageAdd('로그인 되었습니다.', 'success');
        },
        ({ error }) => {
          this.message = error.message;
          this.toastrService.messageAdd('페이스북 로그인에 문제가 발생하였습니다.', 'warning');
        });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

}


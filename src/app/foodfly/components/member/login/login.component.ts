import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, SocialAuthService } from './../../../core';

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
    private auth: AuthService,
    private socialAuth: SocialAuthService
  ) { }

  ngOnInit() {
    this.form = this.formBilder.group({
      username: ['', [
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
        () => this.router.navigate(['main']),
        ({ error }) => this.message = error.message);
  }

  socialSignin(provider: string) {
    this.auth.socialSignin(provider)
      .subscribe(
        () => this.router.navigate(['main']),
        ({ error }) => this.message = error.message);
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

}


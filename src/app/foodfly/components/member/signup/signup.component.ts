import { Component, Input , OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../password.validator';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

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

  message: string;
  userform: FormGroup;

  constructor(private fb: FormBuilder, private router: Router ) { }

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
        Validators.pattern(/^[0-9]+$/)
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
    console.dir(this.userform);
  }
}


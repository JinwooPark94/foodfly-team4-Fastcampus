import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'foodfly-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  testAddress = '서울특별시 강남구 신사동';
  checkoutForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    console.log(this.checkoutForm);

  }

  createForm() {
    this.checkoutForm = this.fb.group({
      address1: [{ value: this.testAddress, disabled: true }, Validators.required],
      address2: ['', Validators.required],
      cellphone: ['', [Validators.required, Validators.pattern('[0-9]{1,20}')]],
      orderRequest: [''],
      agree1: ['', Validators.required],
      agree2: ['', Validators.required],
      agree3: ['', Validators.required],
      agree4: ['', Validators.required],
      payment: ['card'],
    });
  }

  get address1() {
    return this.checkoutForm.get('address1');
  }
  get address2() {
    return this.checkoutForm.get('address2');
  }

  get cellphone() {
    return this.checkoutForm.get('cellphone');
  }

  get orderRequest() {
    return this.checkoutForm.get('orderRequest');
  }

  get agree1() {
    return this.checkoutForm.get('agree1');
  }
  get agree2() {
    return this.checkoutForm.get('agree2');
  }
  get agree3() {
    return this.checkoutForm.get('agree3');
  }
  get agree4() {
    return this.checkoutForm.get('agree4');
  }

  get payment() {
    return this.checkoutForm.get('payment');
  }

  onSubmit() {
    console.log(this.checkoutForm);
    this.checkoutForm.reset();
  }
}

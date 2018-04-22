import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../core';

@Component({
  selector: 'foodfly-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  apiUrl = `${environment.apiUrl}`;
  userData;
  checkoutForm: FormGroup;
  testAddress = '서울특별시 강남구 신사동';

  cart;
  searchInfo;

  userAddress1;
  userAddress2;
  userCellphone;


  constructor(
    private http: HttpClient, private route: ActivatedRoute, private router: Router, 
    private loginService: LoginService, private fb: FormBuilder) {
    // user
   }

  ngOnInit() {
    this.createForm();
    console.log(this.checkoutForm);
    // 사용자 정보 가져오기
    this.cart = JSON.parse(sessionStorage.getItem('sessionStorage-cart'));
    this.searchInfo = JSON.parse(sessionStorage.getItem('sessionStorage-searchInfo'));
    this.userAddress1 = this.searchInfo.address;

    // 카트 세션 { restaurantName: "퀴즈노스 강남구청역점", restaurantPk: 20970, menus: Array(1), account: 9900 }
    console.log('카트 세션', this.cart);
    // 위치 인포 세션 { address: "서울특별시 강남구 논현로123길 35-1", lat: 37.5108295, lag: 127.02928809999999 }
    console.log('위치 인포 세션', this.searchInfo);

    const headers = new HttpHeaders()
      .set('Authorization', `Token ${this.loginService.getToken()}`);

    // this.http.get(`${this.apiUrl}/restaurants/${pk}`)
    //   .subscribe(data => {

    this.http.get(`${this.apiUrl}/members/profile/`, { headers })
      .subscribe(data => {
        console.log('[user]', data);
        this.userData = data;
        this.userCellphone = this.userData.phoneNumber.split('-').join('') + 0;
        console.log('phone number:', this.userCellphone);
        this.createForm();
      });

  }

  // userData = { pk: 7, name: "박진우", phoneNumber: "010-7942-4473", email: "wlsdntus2@naver.com", imgProfile: null }


  createForm() {
    this.checkoutForm = this.fb.group({
      address1: [{ value: this.userAddress1, disabled: true }, Validators.required],
      address2: ['', Validators.required],
      // cellphone: ['', [Validators.required, Validators.pattern('[0-9]{1,20}')]],
      cellphone: [this.userCellphone, [Validators.required, Validators.pattern('[0-9]{1,20}')]],
      orderRequest: [''],    
      agree2: [false, Validators.requiredTrue],
      agree3: [false, Validators.requiredTrue],
      agree4: [false, Validators.requiredTrue],
      agree1: [false, Validators.requiredTrue],      
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

  // get aggreGroup() {
  //   return this.checkoutForm.get('aggreGroup');
  // }

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
    this.router.navigate([`restaurant/paymentcompleted`]);
  }
}

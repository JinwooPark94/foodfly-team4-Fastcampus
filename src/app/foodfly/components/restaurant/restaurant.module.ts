import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RestaurantRoutingModule } from './restaurant-routing.module';

import { FoodorderComponent } from './foodorder/foodorder.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentcompletedComponent } from './paymentcompleted/paymentcompleted.component';

import { ShareModule } from '../../shared/share.module';

import { environment } from '../../../../environments/environment';

// 구글 지도 Api 모듈
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    FoodlistComponent,
    FoodorderComponent,
    CheckoutComponent,
    PaymentcompletedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RestaurantRoutingModule,
    ShareModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiId
    })
  ],
  exports: [
    FoodlistComponent,
    FoodorderComponent,
    CheckoutComponent,
    PaymentcompletedComponent
  ]
})
export class RestaurantModule { }

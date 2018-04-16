import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodorderComponent } from './foodorder/foodorder.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentcompletedComponent } from './paymentcompleted/paymentcompleted.component';

const routes: Routes = [
  {
    path: 'restaurant', children: [
      { path: '', redirectTo: '/restaurant/foodlist', pathMatch: 'full' },
      { path: 'foodorder', component: FoodorderComponent },
      { path: 'foodlist', component: FoodlistComponent },
      { path: 'foodlist/:lat/:lng', component: FoodlistComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'paymentcompleted', component: PaymentcompletedComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RestaurantRoutingModule { }

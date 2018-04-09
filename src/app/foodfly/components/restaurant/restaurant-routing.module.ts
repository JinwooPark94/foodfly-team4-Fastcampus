import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodorderComponent } from './foodorder/foodorder.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: 'restaurant', children: [
      { path: 'foodorder', component: FoodorderComponent },
      { path: 'foodlist', component: FoodlistComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RestaurantRoutingModule { }

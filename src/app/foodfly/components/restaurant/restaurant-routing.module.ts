import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodorderComponent } from './foodorder/foodorder.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentcompletedComponent } from './paymentcompleted/paymentcompleted.component';

import { SessionGuard } from '../../core/guards/session.guard';

const routes: Routes = [
  {
    path: 'restaurant', children: [
      { path: '', redirectTo: '/restaurant/foodlist', pathMatch: 'full' },
      // { path: 'foodorder', component: FoodorderComponent },
      { path: 'foodorder/:pk', component: FoodorderComponent, canActivate: [SessionGuard] },
      { path: 'foodlist', component: FoodlistComponent, canActivate: [SessionGuard] },
      { path: 'foodlist/:category', component: FoodlistComponent, canActivate: [SessionGuard] },
      // { path: 'foodlist/:category/:filter', component: FoodlistComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [SessionGuard] },
      { path: 'paymentcompleted', component: PaymentcompletedComponent, canActivate: [SessionGuard] }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RestaurantRoutingModule { }

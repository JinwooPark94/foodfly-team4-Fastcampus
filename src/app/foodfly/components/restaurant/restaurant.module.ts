import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantroutesModule } from './restaurant-routes.module';

import { FoodorderComponent } from './foodorder/foodorder.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RestaurantManagementComponent } from './restaurant.management.component';

@NgModule({
  declarations: [
    RestaurantManagementComponent,
    FoodlistComponent,
    FoodorderComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule, RestaurantroutesModule
  ],
  exports: [
    RestaurantManagementComponent,
    FoodlistComponent,
    FoodorderComponent,
    CheckoutComponent
  ]
})
export class RestaurantModule { }

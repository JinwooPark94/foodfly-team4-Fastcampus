import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RestaurantRoutingModule } from './restaurant-routing.module';

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
    CommonModule,
    ReactiveFormsModule,
    RestaurantRoutingModule
  ],
  exports: [
    RestaurantManagementComponent,
    FoodlistComponent,
    FoodorderComponent,
    CheckoutComponent
  ]
})
export class RestaurantModule { }

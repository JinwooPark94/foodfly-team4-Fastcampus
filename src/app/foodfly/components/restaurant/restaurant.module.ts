import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RestaurantRoutingModule } from './restaurant-routing.module';

import { FoodorderComponent } from './foodorder/foodorder.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RestaurantManagementComponent } from './restaurant.management.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    RestaurantManagementComponent,
    FoodlistComponent,
    FoodorderComponent,
    CheckoutComponent
  ],
  imports: [
<<<<<<< HEAD
    CommonModule, RestaurantRoutingModule, BrowserAnimationsModule
=======
    CommonModule,
    ReactiveFormsModule,
    RestaurantRoutingModule
>>>>>>> 82fc24d35fd56f247c8c147ef8fae37e848ca084
  ],
  exports: [
    RestaurantManagementComponent,
    FoodlistComponent,
    FoodorderComponent,
    CheckoutComponent
  ]
})
export class RestaurantModule { }

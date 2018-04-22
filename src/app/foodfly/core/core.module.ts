import { NgModule } from '@angular/core';

// npm i angular2-jwt
import { JwtHelper } from 'angular2-jwt';

import { LoginService } from './services/login.service';
import { SocialLoginService } from './services/social-login.service';
import { ToastrService } from './services/toastr.service';
import { FoodorderService } from './services/foodorder.service';
import { PreloaderService } from './services/preloader.service';

import { TokenGuard } from './guards/token.guard';

import { ToastrPipe } from './pipes/toastr.pipe';

@NgModule({
  providers: [
    JwtHelper,
    LoginService,
    SocialLoginService,
    FoodorderService,
    ToastrService,
    TokenGuard,
    PreloaderService
  ],
  declarations: [ToastrPipe],
  exports: [ToastrPipe]
})
export class CoreModule { }

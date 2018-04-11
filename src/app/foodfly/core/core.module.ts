import { NgModule } from '@angular/core';

// npm i angular2-jwt
import { JwtHelper } from 'angular2-jwt';

import { LoginService } from './services/login.service';
import { TokenGuard } from './guards/token.guard';
import { SocialLoginService } from './services/social-login.service';
import { ToastService } from './services/toast.service';
import { ToastPipe } from './pipes/toast.pipe';

@NgModule({
  providers: [
    JwtHelper,
    LoginService,
    TokenGuard,
    SocialLoginService,
    ToastService
  ],
  declarations: [ToastPipe],
  exports: [ToastPipe]
})
export class CoreModule { }

import { NgModule } from '@angular/core';

// 3rd party
// npm i angular2-jwt
import { JwtHelper } from 'angular2-jwt';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SocialAuthService } from './services/social-auth.service';

@NgModule({
  providers: [
    JwtHelper,
    AuthService,
    AuthGuard,
    SocialAuthService
  ]
})
export class CoreModule { }

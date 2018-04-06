import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

// 공용 모듈
import { ShareModule } from './foodfly/shared/share.module';

// 코어 모듈
import { CoreModule } from './foodfly/core/core.module';

// 주요 모듈
import { MainModule } from './foodfly/components/main/main.module';
import { MemberModule } from './foodfly/components/member/member.module';
import { MypageModule } from './foodfly/components/mypage/mypage.module';
import { RestaurantModule } from './foodfly/components/restaurant/restaurant.module';

import { NotfoundpageComponent } from './foodfly/components/notfoundpage/notfoundpage.component';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShareModule,
    CoreModule,
    MainModule,
    MemberModule,
    MypageModule,
    RestaurantModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

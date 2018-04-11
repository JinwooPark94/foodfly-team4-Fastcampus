// Common 모듈
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// root App 컴포넌트
import { AppComponent } from './app.component';

// 라우터 모듈
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

@NgModule({
  declarations: [
    AppComponent
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

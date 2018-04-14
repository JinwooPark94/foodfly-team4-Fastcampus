// Common 모듈
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/share.module';

// Route Module
import { MainRoutingModule } from './main-routing.module';

// Component main and pagenotfound
import { MainComponent } from './main.component';
import { NotfoundpageComponent } from '../notfoundpage/notfoundpage.component';

// thiyrd-part
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    MainComponent,
    NotfoundpageComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    MainRoutingModule,
    // thiyrd-part
    SwiperModule,
  ],
  providers: [
    // thiyrd-part
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  exports: [
    MainComponent,
    NotfoundpageComponent
  ]
})
export class MainModule {}

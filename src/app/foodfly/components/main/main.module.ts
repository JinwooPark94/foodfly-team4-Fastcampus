import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/share.module';

import { MainComponent } from './main.component';

// thiyrd-part
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};


@NgModule({
  imports: [
    CommonModule,
    ShareModule,
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
  declarations: [ MainComponent ],
  exports: [ MainComponent ]

})
export class MainModule { }

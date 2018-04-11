import { Component, OnInit, ViewChild  } from '@angular/core';

// third-party
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'foodfly-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  show = true;
  disabled = false;


  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true
  };

  scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };


  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  items;

  constructor() {
    this.items = [
      {
        name: '스노우폭스 뱅뱅점',
        category: ['도시락', '간편', '분식'],
        minPrice: 16000,
        flyTip: 0,
        distance: 0.8,
        img: 'https://cdn.bmf.kr/_data/product/I8AF0/623375a66e166296821ed241f9845cf8.jpg'
      },
      {
        name: '샐러드투고',
        category: ['샐러드', '다이어트', '칠리새우'],
        minPrice: 15000,
        flyTip: 3000,
        distance: 0.8,
        img: 'https://cdn.bmf.kr/_data/product/201702/10/ff64a3dfe5a7597342b9fd69c1a63c02.jpg'
      },
      {
        name: '직화락 역삼점',
        category: ['도시락', '직화구이', '돈까스'],
        minPrice: 10000,
        flyTip: 3000,
        distance: 0.8,
        img: 'https://cdn.bmf.kr/_data/product/I3F2A/d4f1b351fe1c390e38055d82ac6ecd9b.jpg'
      },
      {
        name: '뱃길따라',
        category: ['물회', '무침', '대하'],
        minPrice: 15000,
        flyTip: 0,
        distance: 0.8,
        img: 'https://cdn.bmf.kr/_data/product/201611/22/5d0c5d59bd608ab9943f8d80d616beae.jpg'
      },
      {
        name: '샐러드투고',
        category: ['샐러드', '다이어트', '칠리새우'],
        minPrice: 15000,
        flyTip: 3000,
        distance: 0.8,
        img: 'https://cdn.bmf.kr/_data/product/201702/10/ff64a3dfe5a7597342b9fd69c1a63c02.jpg'
      },
      {
        name: '직화락 역삼점',
        category: ['도시락', '직화구이', '돈까스'],
        minPrice: 10000,
        flyTip: 3000,
        distance: 0.8,
        img: 'https://cdn.bmf.kr/_data/product/I3F2A/d4f1b351fe1c390e38055d82ac6ecd9b.jpg'
      }
    ];
  }

  ngOnInit() {
  }

}

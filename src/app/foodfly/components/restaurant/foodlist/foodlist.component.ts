import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { PreloaderService } from '../../../core/services/preloader.service';


@Component({
  selector: 'foodfly-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css'],
})


export class FoodlistComponent implements OnInit, AfterViewInit {

  // url = 'http://localhost:3000/restaurant';
  apiUrl = `${environment.apiUrl}`;
  foodflyDB;
  items;

  over: boolean[];
  scrollTopVisble: boolean;

  pageItemNum = 8;
  scrollMessage;


  filters;
  selectedFilter = '';

  dummyImg = ['https://kcf1.foodfly.co.kr/restaurants/15150/25230029659e805a00ca33.jpg',
  'https://kcf1.foodfly.co.kr/restaurants/15150/87046131859e805a039dfb.jpg'];

  loading: boolean;

  lat: number;
  lng: number;
  category: string;
  currentFilter = '';

  constructor(public http: HttpClient, private route: ActivatedRoute, private preloader: PreloaderService) {
    this.scrollTopVisble = false;

    this.category = 'all';
    this.lat = 0;
    this.lng = 0;

    this.filters = [
      { url: '거리순', slug: '거리순' },
      { url: '인기순', slug: '인기순' },
      { url: '배달팁순', slug: '배달팁 순' },
      { url: '최소주문금액순', slug: '최소 주문 금액 순 순' },
    ];


    route.params.subscribe(params => { this.category = params['category']; });
    route.params.subscribe(params => { this.currentFilter = params['filter']; });
  }

  ngOnInit() {
    // console.log('lat', this.route.snapshot.paramMap.get('lat'));
    // console.log('lng', this.route.snapshot.paramMap.get('lng'));
    // console.log('category', this.route.snapshot.paramMap.get('category'));

    console.log(this.apiUrl);
    this.getRestaurntList();
  }

  getRestaurntList() {
    // this.loading = true;
    this.http.get(`${this.apiUrl}/restaurants/`)
    .subscribe( data => {
      this.foodflyDB = data['results'];
      console.log('[get restaurant list]', data);

      // this.pagination();
      this.items = this.foodflyDB;
      console.log('[rastaurnat list]', this.foodflyDB);

      this.over = new Array(this.foodflyDB.length);
      this.over.fill(false);
    });
  }

  ngAfterViewInit() {
    // setTimeout(() => this.preloader.hide(), 200);
  }


  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    console.log('top');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
        this.scrollTopVisble = true;
      } else if (this.scrollTopVisble && number < 10) {
        this.scrollTopVisble = false;
      }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      this.pagination();
    }
  }

  pagination() {
    if (!this.items) {
      this.items = this.foodflyDB.slice(0, this.pageItemNum);
      // console.log('[items 0 ]');
      return;
    }

    const arr = this.foodflyDB.slice(this.items.length, this.items.length + this.pageItemNum);
    // const restItem = this.foodflyDB.length - this.items.length;

    console.log(
      'db imte', this.foodflyDB.length,
      '현재 item', this.items,
      'slice', this.items.length + this.pageItemNum,
      // 'rest item', restItem
    );

    // if (restItem < this.pageItemNum && restItem > 1) {
    //   console.log('더있음');
    // }

    if (this.foodflyDB.length === this.items.length) {
      this.scrollMessage = '마지막 페이지 입니다.';
      return;
    }

    this.items = [...this.items, ...arr];
  }


  selectFilter(e) {
    console.log('click', e);
  }
}

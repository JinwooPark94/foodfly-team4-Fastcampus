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


  apiUrl = `${environment.apiUrl}/restaurants/`;
  currenUrl;
  foodflyDB;
  count;
  nextPage;
  previousPage;

  categories;

  items;
  itemsNum;

  over: boolean[];
  pageItemNum = 8;
  scrollMessage;


  filters;
  selectedFilter = '';

  dummyImg = ['https://kcf1.foodfly.co.kr/restaurants/15150/25230029659e805a00ca33.jpg',
  'https://kcf1.foodfly.co.kr/restaurants/15150/87046131859e805a039dfb.jpg'];

  loading: boolean;

  lat: number;
  lng: number;
  currentCategory: string;
  scrollTopVisble: boolean;

  currentFilter = '';

  constructor(public http: HttpClient, private route: ActivatedRoute, private preloader: PreloaderService) {
    this.scrollTopVisble = false;

    this.lat = 0;
    this.lng = 0;

    this.categories = {'한식': 2, '일식': 3, '카페': 4 , '양식': 5, '퓨전': 6, '분식': 7, '햄버거': 8, '치킨': 9, '중식': 10, '피자': 11};

    this.filters = [
      { url: 'avg_delivery_time', slug: '거리순' },
      { url: 'delivery_price', slug: '배달팁 순' },
      { url: 'min_order_price', slug: '최소 주문 금액 순' },
    ];

    route.params.subscribe(params => {
      this.currentCategory = params['category'];
      this.getRestaurntList();
    });
    route.params.subscribe(params => { this.currentFilter = params['filter']; });
  }

  ngOnInit() {
    console.log(this.apiUrl);

    this.preloader.show();
    this.currenUrl = this.apiUrl;
    if (!this.currentCategory) { this.currentCategory = '전체'; }
    this.getRestaurntList();
    this.consoleLog();
  }

  getRestaurntList(filter = null) {
    this.preloader.show();

    if (this.currentCategory in this.categories === true) {
      this.currenUrl = `${this.apiUrl}?categories=${this.categories[this.currentCategory]}`;
    } else if (this.currentCategory === '전체') {
      this.currenUrl = this.apiUrl;
    } else {
      this.currenUrl = `${this.apiUrl}?search=${this.currentCategory}`;
    }

    if (filter) {
      this.currenUrl = `${this.currenUrl}?ordering=${filter}`;
    }

    console.log('[api url]', this.currenUrl);

    this.http.get(this.currenUrl)
    .subscribe( data => {
      this.foodflyDB = data['results'];
      this.count = data['count'];
      this.nextPage = data['nextPage'];
      this.previousPage = data['previousPage'];

      this.items = this.foodflyDB;
      this.itemsNum = this.items.length;
      console.log('[rastaurnat list]', this.foodflyDB);

      this.over = new Array(this.foodflyDB.length);
      this.over.fill(false);

      setTimeout(() => this.preloader.hide(), 200);

      this.consoleLog();
    });
  }

  selectFilter(select) {
    console.log('select', select);
    this.currentFilter = select;
    this.getRestaurntList(select);
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
      // this.pagination();
    }
  }

  consoleLog() {
    console.log('[<<<< console star');
    console.log('[API URL]', this.apiUrl);
    console.log('[current URL]', this.currenUrl);
    console.log('[카테고리]', this.currentCategory);
    console.log('[필터]', this.currentFilter);
    console.log('[GET 레스토랑 리스트]', this.items);
    console.log('[console end >>>>]');
  }

}

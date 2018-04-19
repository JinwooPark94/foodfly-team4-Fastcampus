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
  foodflyDB;
  count;
  nextPage;
  previousPage;
  categories;

  items;
  filters;

  lat: number;
  lng: number;

  currentUrl;
  currentCategory: string;
  currentPage = 1;
  currentFilter;

  scrollTopVisble: boolean;


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
      if (params['category']) {
        this.currentCategory = params['category'];
      } else {
        this.currentCategory = '전체';
      }
      this.currentPage = 1;
      this.getRestaurntList();
    });

    route.params.subscribe(params => {
      if (params['filter']) {
        this.currentFilter = params['filter'];
      } else {
        this.currentFilter = 'avg_delivery_time';
      }
    });
  }

  ngOnInit() {
    console.log(this.apiUrl);
    this.preloader.show();
    this.getRestaurntList();
  }

  getRestaurntList() {
    this.preloader.show();

    if (this.currentCategory === '전체') {
      this.currentUrl = `${this.apiUrl}?page=${this.currentPage}&ordering=${this.currentFilter}`;
    } else if (this.currentCategory in this.categories === true) {
      this.currentUrl = `
      ${this.apiUrl}?page=${this.currentPage}&ordering=${this.currentFilter}&categories=${this.categories[this.currentCategory]}`;
    } else {
      this.currentUrl = `${this.apiUrl}?page=${this.currentPage}&ordering=${this.currentFilter}&search=${this.currentCategory}`;
    }
    console.log('[api url]', this.currentUrl);

    this.http.get(this.currentUrl)
    .subscribe( data => {
      this.foodflyDB = data['results'];
      this.count = data['count'];
      this.nextPage = data['nextPage'];
      this.previousPage = data['previousPage'];

      if (this.currentPage > 1) {
        this.items = [...this.items, ...this.foodflyDB];
      } else {
        this.items = this.foodflyDB;
      }
      setTimeout(() => this.preloader.hide(), 200);
      console.log('[rastaurnat list]', this.foodflyDB);
      this.log();
    });
  }

  selectFilter(select) {
    console.log('select', select);
    this.currentFilter = select;
    this.getRestaurntList();
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

    const isLastHeight = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
    console.log('isLastHeight', isLastHeight);
    console.log('this.nextPage', this.nextPage);
    console.log('isLastHeight nextPage', (isLastHeight && this.nextPage));

    if (isLastHeight && this.nextPage) {
      this.currentPage = this.nextPage;
      console.log('더했음');
      this.getRestaurntList();
    }
  }

  log() {
    console.log('[<<<< console star');
    console.log('[API URL]', this.apiUrl);
    console.log('[current URL]', this.currentUrl);

    console.log(
      '[카테고리]: ', this.currentCategory,
      '[nextpage]: ', this.nextPage,
      '  [필터]: ', this.currentFilter,
      '  [GET 레스토랑 리스트]:', this.items,
      '  [console end >>>>]: '
    );
  }

}

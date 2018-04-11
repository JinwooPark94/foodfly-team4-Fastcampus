import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'foodfly-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css'],
})

export class FoodlistComponent implements OnInit {
  url = 'http://localhost:3000/restaurant';
  foodflyDB;
  items;

  over: boolean[];
  scrollTopVisble: boolean;

  pageItemNum = 3;
  scrollMessage;

  filter = ['거리순', '인기순', '배달팁 순', '최소 주문 금액 순'];
  selectedFilter = '';

  constructor(public http: HttpClient) {
    this.scrollTopVisble = false;
  }

  ngOnInit() {
    this.http.get(this.url)
      // 요청 결과를 프로퍼티에 할당
      .subscribe(data => {
        this.foodflyDB = data;
        console.log('[data]', data);
        this.pagination();

        this.over = new Array(this.foodflyDB.length);
        this.over.fill(false);
      });
    console.log(window);
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
    //
    if (!this.items) {
      this.items = this.foodflyDB.slice(0, this.pageItemNum);
      console.log('[items 0 ]');
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

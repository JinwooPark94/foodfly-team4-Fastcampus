
import { Component, OnInit, IterableDiffers, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FoodorderService } from '../../../core/services/foodorder.service';

import { OrderList } from '../../../core/interface/foodorder.interface';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';

import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'foodfly-foodorder',
  templateUrl: './foodorder.component.html',
  styleUrls: ['./foodorder.component.css'],
  providers: [FoodorderService],
  animations: [
    trigger('accordion', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ height: 0 }),
        animate(200, style({ height: '*' }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({ height: 0 }))
      ])
    ])
  ]
})

export class FoodorderComponent implements OnInit, DoCheck {

  apiUrl = `${environment.apiUrl}`;
  restaurantDB: any = [];
  menuCategories: any = [];

  navItems: string[] = ['메뉴', '정보', '리뷰'];
  selectedItem: string;

  constructor(private differs: IterableDiffers, private foodorderService: FoodorderService,
    private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const pk = this.route.snapshot.paramMap.get('pk');
    // console.log(this.apiUrl);

    this.getRestaurant(pk);
    // this.http.get(this.url)
    //   // 요청 결과를 프로퍼티에 할당
    //   .subscribe(data => {
    //     this.foodflyDB = data;
    //     console.log('[data]', data);
    //     this.pagination();

    //     this.over = new Array(this.foodflyDB.length);
    //     this.over.fill(false);
    //   });
    // console.log(window);


    this.selectedItem = this.navItems[0];
  }

  // orderlist 배열을 확인하여 값이 바뀌면 실행
  ngDoCheck() {
    const changes = this.differs.find(this.foodorderService.orderlist);
    // console.log(changes);
    if (changes) {
      this.foodorderService.setFoodOrderStorage();
    }
  }

  getRestaurant(pk) {
    // this.loading = true;
    this.http.get(`${this.apiUrl}/restaurants/${pk}`)
    .subscribe( data => {
      this.restaurantDB = data;
      this.menuCategories = data['menuCategories'];
      console.log('[get restaurant]', data['menuCategories'][0]['menus']);
    });
  }


  changeNavItem(navItem: string) {
    this.selectedItem = navItem;
  }

}


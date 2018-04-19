
import { Component, OnInit, IterableDiffers, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { PreloaderService } from '../../../core/services/preloader.service';
import { FoodorderService } from '../../../core/services/foodorder.service';

import { OrderList } from '../../../core/interface/foodorder.interface';

import { environment } from '../../../../../environments/environment';

import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';


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

export class FoodorderComponent implements OnInit, DoCheck, OnDestroy {

  apiUrl = `${environment.apiUrl}`;
  restaurantDB: any = [];
  menuCategories: any = [];

  navItems: string[] = ['메뉴', '정보', '리뷰'];
  selectedItem: string;

  toggleMenu = false;

  routerSubscriber: Subscription;

  pk: number;

  constructor(private differs: IterableDiffers,
              private foodorderService: FoodorderService,
              private preloadService: PreloaderService,
              private http: HttpClient,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // route 감지
    this.routerSubscriber = this.route.paramMap
    .subscribe(
      params => {
        this.pk = Number.parseInt(params.get('pk'));
        this.getRestaurant(this.pk);
      });

    this.selectedItem = this.navItems[0];
  }

  ngOnDestroy() {
    this.routerSubscriber.unsubscribe();
  }

  // orderlist 배열을 확인하여 값이 바뀌면 실행
  ngDoCheck() {
    const changes = this.differs.find(this.foodorderService.orderlist);
    console.log(changes);
    if (changes) {
      // this.restaurantDB.name : 레스토랑 이름
      // session에 데이터 저장
      this.foodorderService.setFoodOrderStorage(this.restaurantDB.name);
    }
  }

  getRestaurant(pk) {
    this.preloadService.show();
    this.http.get(`${this.apiUrl}/restaurants/${pk}`)
    .subscribe( data => {
      this.restaurantDB = data;
      this.menuCategories = data['menuCategories'];
      console.log('[get restaurant]', data['menuCategories'][0]['menus']);
      this.preloadService.hide();
    });
  }

  changeNavItem(navItem: string) {
    this.selectedItem = navItem;
  }
}

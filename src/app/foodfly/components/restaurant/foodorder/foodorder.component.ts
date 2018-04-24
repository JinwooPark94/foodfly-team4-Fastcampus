
import { Component, OnInit, IterableDiffers, DoCheck, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

import { PreloaderService } from '../../../core/services/preloader.service';
import { FoodorderService } from '../../../core/services/foodorder.service';

import { OrderAllList } from '../../../core/interface/foodorder.interface';

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

// var fadeAnimation = animation([
//   style({ opacity: '{{ start }}' }),
//   animate('{{ time }}',
//     style({ opacity: '{{ end }}' }))
// ], { params: { time: '1000ms', start: 0, end: 1 } });

export class FoodorderComponent implements OnInit, DoCheck, OnDestroy {

  apiUrl = `${environment.apiUrl}`;
  restaurantDB: any = [];
  menuCategories: any = [];
  restaurantTags: any = [];
  restaurantOrdertypes: any = [];
  toggle: boolean[];
  deliveryprice: number;

  navItems: string[] = ['메뉴', '정보', '리뷰'];
  selectedItem: string;

  routerSubscriber: Subscription;

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
        console.log(Number.parseInt(params.get('pk')));
        this.foodorderService.restaurantPk = Number.parseInt(params.get('pk'));
        this.foodorderService.orderlist = this.foodorderService.getOrderlistData();
        this.getRestaurant(this.foodorderService.restaurantPk);
      });
      this.selectedItem = this.navItems[0];
    }

    ngOnDestroy() {
      this.routerSubscriber.unsubscribe();
    }

    // orderlist 배열을 확인하여 값이 바뀌면 실행
    ngDoCheck() {
      const changes = this.differs.find(this.foodorderService.orderlist);
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
      console.log(data);
      this.restaurantDB = data;
      this.deliveryprice = data['deliveryPrice'];

      this.foodorderService.diveryprice = data['deliveryPrice'];

      // "[메뉴 이름]" => "메뉴 이름" 으로 string 변환
      data['menuCategories'] = data['menuCategories'].map(menutitle => {
        menutitle.name = menutitle.name.substring(1, menutitle.name.length - 1);
        return menutitle;
      });
      this.menuCategories = data['menuCategories'];

      // ["분류1", "분류2"...] => 분류1, 분류2... 으로 변환
      data['tags'] = data['tags'].map(restaurantTags => restaurantTags.name);
      this.restaurantTags = data['tags'];

      // ["주문유형1", "주문유형2"...] => 주문유형1, 주뮨유형2... 으로 변환
      data['orderTypes'] = data['orderTypes'].map(orderTypes => orderTypes.name);
      this.restaurantOrdertypes = data['orderTypes'];


      // 메뉴리스트에 토글을 위해 index로 배열을 생성해 false 값 부여
      this.preloadService.hide();
        this.toggle = new Array(this.menuCategories.length);
        this.toggle.fill(true);
        this.toggle[0] = false;
    });
  }

  changeNavItem(navItem: string) {
    this.selectedItem = navItem;
  }
}

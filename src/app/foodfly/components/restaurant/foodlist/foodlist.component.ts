import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foodfly-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})
export class FoodlistComponent implements OnInit {
  items = [];
  item;

  constructor() { 
    this.item = {
      name: '스노우폭스 뱅뱅점',
      category: ['도시락', '간편', '분식'],
      minPrice: 15000,
      flyTip: 3000,
      distance: 0.8,
      images: [
        'https://fakeimg.pl/230x304/?text=food one',
        'https://fakeimg.pl/230x304/?text=food two',
      ]
    };
  }

  ngOnInit() {
    this.itemRepeat();
  }

  itemRepeat() {
    const repeatNum = 12;
    for (let i = 0; i < repeatNum; i++) {
      this.items = [...this.items, this.item];
    }
  }

}

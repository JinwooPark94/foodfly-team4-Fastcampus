import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foodfly-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  searchToggleStatus;

  categories;

  constructor() {
    this.searchToggleStatus = false;
    this.categories = ['전체', '한식', '일식', '카페', '양식', '퓨전', '분식', '햄버거', '치킨', '중식', '피자'];
  }

  ngOnInit() {
  }

  searchToggle() {
    this.searchToggleStatus = !this.searchToggleStatus;
    console.log('[searchToggleStatus]', this.searchToggleStatus);
  }


  search(value) {
    console.log('go search=>', value);
  }
}

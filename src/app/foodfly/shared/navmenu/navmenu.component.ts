import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'foodfly-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  searchToggleStatus;
  categories;
  currentCategory;

  constructor(private route: ActivatedRoute) {
    this.searchToggleStatus = false;
    this.categories = ['전체', '한식', '일식', '카페', '양식', '퓨전', '분식', '햄버거', '치킨', '중식', '피자'];
  }

  ngOnInit() {
    this.currentCategory = '전체';
    console.log('[navmenu-category]', this.route.snapshot.paramMap.get('category'));
    console.log('[navmenu-currentCategory]', this.currentCategory);
  }

  searchToggle() {
    this.searchToggleStatus = !this.searchToggleStatus;
    console.log('[searchToggleStatus]', this.searchToggleStatus);
  }


  search(value) {
    console.log('go search=>', value);
  }
}

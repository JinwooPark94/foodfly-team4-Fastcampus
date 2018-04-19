import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'foodfly-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') inputEl: ElementRef;

  searchVisible;
  categories;
  currentCategory;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.searchVisible = false;
    this.categories = ['전체', '한식', '일식', '카페', '양식', '퓨전', '분식', '햄버거', '치킨', '중식', '피자'];
  }

  ngOnInit() {
    this.currentCategory = '전체';
    console.log('[navmenu-category]', this.route.snapshot.paramMap.get('category'));
    console.log('[navmenu-currentCategory]', this.currentCategory);
  }

  searchToggle() {
    this.searchVisible = this.searchVisible ? false : true;
    console.log('[searchVisible]', this.searchVisible);

    if (this.searchVisible) {
      this.inputEl.nativeElement.focus();
    }
    console.log(this.inputEl);
  }


  onSearch(value) {
    console.log('go search=>', value);
    this.router.navigate([`restaurant/foodlist/${value}`]);
  }

  ngAfterViewInit() {
    // this.inputEl.nativeElement.focus();
  }

}

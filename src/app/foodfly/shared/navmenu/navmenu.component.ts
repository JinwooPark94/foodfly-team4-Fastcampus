import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'foodfly-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInputEl: ElementRef;
  @ViewChild('searchButton') searchButtonEl: ElementRef;

  categories;
  currentCategory;

  isSearchVisible;
  isInputBlur;
  isInputFocus;
  isButtonBlur;
  isButtonFocus;

  constructor(private route: ActivatedRoute, private router: Router, public elRef: ElementRef, private renderer: Renderer) {
    this.isSearchVisible = false;
    this.categories = ['전체', '한식', '일식', '카페', '양식', '퓨전', '분식', '햄버거', '치킨', '중식', '피자'];
  }

  ngOnInit() {
    this.currentCategory = '전체';
    this.doReset();
  }

  searchToggle() {
    this.isSearchVisible = this.isSearchVisible ? false : true;
    console.log('[searchVisible]', this.isSearchVisible);

    if (this.isSearchVisible) {
      this.searchInputEl.nativeElement.focus();
    }
  }

  inputBlur() {
    this.isInputFocus = false;
    this.isInputBlur = true;
    setTimeout(() => {
      if (!this.isButtonFocus) {
        this.doReset();
      }
    }, 100);
  }

  buttonBlur() {
    this.isButtonFocus = false;
    this.isButtonBlur = true;
    setTimeout(() => {
      if (!this.isInputFocus) {
        this.doReset();
      }
    }, 100);
  }

  doReset() {
    this.isSearchVisible = false;
    this.isInputBlur = false;
    this.isInputFocus = false;
    this.isButtonBlur = false;
    this.isButtonFocus = false;
    console.log('doReset()');
  }

  onSearch(keyword) {
    if (!keyword) {
      this.searchInputEl.nativeElement.focus();
      return;
    }
    console.log('go search=>', keyword);
    this.router.navigate([`restaurant/foodlist/${keyword}`]);
  }


  ngAfterViewInit() {
    // this.inputEl.nativeElement.focus();
  }

}

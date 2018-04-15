import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foodfly-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  searchToggleStatus;

  constructor() {
    this.searchToggleStatus = false;
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

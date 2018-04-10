import { Component } from '@angular/core';

@Component({
  selector: 'foodfly-root',
  template: `
    <foodfly-header></foodfly-header>
    <foodfly-navmenu></foodfly-navmenu>
    <foodfly-toast></foodfly-toast>
    <router-outlet></router-outlet>
    <foodfly-footer></foodfly-footer>
  `
})

export class AppComponent {}

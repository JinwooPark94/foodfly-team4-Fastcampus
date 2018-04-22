import { Component } from '@angular/core';

@Component({
  selector: 'foodfly-root',
  template: `
    <foodfly-preloader></foodfly-preloader>
    <foodfly-header></foodfly-header>
    <foodfly-toastr></foodfly-toastr>
    <router-outlet></router-outlet>
    <foodfly-footer></foodfly-footer>
  `
})

export class AppComponent { }

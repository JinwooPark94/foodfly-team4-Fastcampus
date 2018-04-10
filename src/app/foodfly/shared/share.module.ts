import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    NavmenuComponent,
    ToastComponent
  ],
  imports: [
    CommonModule, RouterModule, CoreModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    NavmenuComponent,
    ToastComponent
  ]
})

export class ShareModule { }

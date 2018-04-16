import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { ToastComponent } from './toast/toast.component';
import { PreloaderComponent } from './preloader/preloader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    NavmenuComponent,
    ToastComponent,
    PreloaderComponent
  ],
  imports: [
    CommonModule, RouterModule, CoreModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    NavmenuComponent,
    ToastComponent,
    PreloaderComponent
  ]
})

export class ShareModule { }

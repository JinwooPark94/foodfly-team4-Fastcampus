// Common 모듈
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/share.module';

// Route Module
import { MainRoutingModule } from './main-routing.module';

// Component main and pagenotfound
import { MainComponent } from './main.component';
import { NotfoundpageComponent } from '../notfoundpage/notfoundpage.component';

@NgModule({
  declarations: [
    MainComponent,
    NotfoundpageComponent
  ],
  imports: [
    CommonModule, ShareModule, MainRoutingModule
  ],
  exports: [
    MainComponent,
    NotfoundpageComponent
  ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../shared/share.module';

import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule
  ],
  declarations: [ MainComponent ],
  exports: [ MainComponent ]
})
export class MainModule { }

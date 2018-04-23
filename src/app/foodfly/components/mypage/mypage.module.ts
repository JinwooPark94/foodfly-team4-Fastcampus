// Common Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Mypage Route Module
import { MypageRoutingModule } from './mypage-routing.module';

// Mypage Component
import { AccountComponent } from './account/account.component';
import { MyorderComponent } from './myorder/myorder.component';
import { QnaComponent } from './qna/qna.component';

@NgModule({
  declarations: [
    AccountComponent,
    QnaComponent,
    MyorderComponent
  ],
  imports: [
    CommonModule, MypageRoutingModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    AccountComponent,
    QnaComponent,
    MyorderComponent
  ]
})
export class MypageModule { }

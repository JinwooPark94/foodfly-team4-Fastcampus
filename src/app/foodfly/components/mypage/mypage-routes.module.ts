// Common Module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Mypage Component
import { AccountComponent } from '../../components/mypage/account/account.component';
import { MyorderComponent } from '../../components/mypage/myorder/myorder.component';
import { QnaComponent } from '../../components/mypage/qna/qna.component';

const routes: Routes = [
  {
    path: 'mypage', children: [
      { path: 'account', component: AccountComponent },
      { path: 'myorder', component: MyorderComponent },
      { path: 'qna', component: QnaComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MypageroutesModule { }

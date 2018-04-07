// Common Module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Mypage Component
import { AccountComponent } from '../../components/mypage/account/account.component';
import { MyorderComponent } from '../../components/mypage/myorder/myorder.component';
import { QnaComponent } from '../../components/mypage/qna/qna.component';

import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'mypage', children: [
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
      { path: 'myorder', component: MyorderComponent, canActivate: [AuthGuard] },
      { path: 'qna', component: QnaComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MypageroutesModule { }

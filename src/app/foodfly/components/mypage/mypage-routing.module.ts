// Common Module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Mypage Component
import { AccountComponent } from '../../components/mypage/account/account.component';
import { MyorderComponent } from '../../components/mypage/myorder/myorder.component';
import { QnaComponent } from '../../components/mypage/qna/qna.component';

import { TokenGuard } from '../../core/guards/token.guard';

const routes: Routes = [
  {
    path: 'mypage', children: [
      { path: '', redirectTo: '/mypage/account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent, canActivate: [TokenGuard] },
      { path: 'myorder', component: MyorderComponent, canActivate: [TokenGuard] },
      { path: 'qna', component: QnaComponent, canActivate: [TokenGuard] }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MypageRoutingModule { }

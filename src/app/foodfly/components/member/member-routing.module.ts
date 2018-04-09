import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../../components/member/login/login.component';
import { SignupComponent } from '../../components/member/signup/signup.component';
import { FindmemberinfoComponent } from '../../components/member/findmemberinfo/findmemberinfo.component';

const routes: Routes = [
  {
    path: 'member', children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'findmemberinfo', component: FindmemberinfoComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class MemberRoutingModule { }

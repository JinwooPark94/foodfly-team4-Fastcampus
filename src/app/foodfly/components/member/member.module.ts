// Common Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Route Module
import { MemberRoutesModule } from './member-routes.module';

// Component member
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FindmemberinfoComponent } from './findmemberinfo/findmemberinfo.component';
import { MemberManagementComponent } from './member.management.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    FindmemberinfoComponent,
    MemberManagementComponent
  ],
  imports: [
    CommonModule, FormsModule, MemberRoutesModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    FindmemberinfoComponent,
    MemberManagementComponent
  ]
})
export class MemberModule { }

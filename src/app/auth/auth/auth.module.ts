import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from '../auth-page/auth-page.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing';
import { SharedModule } from 'src/app/share/shared/shared.module';



@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
  ],
  exports:[AuthPageComponent,
  FormsModule]
})
export class AuthModule { }

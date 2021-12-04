import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from 'src/app/auth/auth-page/auth-page.component';
import { AlertComponentComponent } from '../alert-component/alert-component.component';
import { DropdownDirective } from '../dropdown.directive';
import { PlaceHolderDirective } from '../place-holder-directive/place-holder.directive';
import { SpinnerComponent } from '../spinner/spinner/spinner.component';



@NgModule({
  declarations: [
    DropdownDirective,
    SpinnerComponent,
    AlertComponentComponent,
    PlaceHolderDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    DropdownDirective,
    SpinnerComponent,
    AlertComponentComponent,
    PlaceHolderDirective,
  ],
})
export class SharedModule { }

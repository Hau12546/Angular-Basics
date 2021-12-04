import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from '../shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../shopping-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from './shopping-routing';
import { SharedModule } from 'src/app/share/shared/shared.module';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShoppingRoutingModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  exports:[
    ShoppingListComponent,
    ShoppingEditComponent,
  ]
})
export class ShoppingRouteScopeModule { }

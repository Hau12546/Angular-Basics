import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeStarterComponent } from '../recipe-starter/recipe-starter.component';
import { RecipeComponent } from '../recipe.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeRoutes, RecipeRoutingModule } from './recipe-routing';
import { SharedModule } from 'src/app/share/shared/shared.module';



@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeStarterComponent,
  ],
  imports: [
    SharedModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  exports:[
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeStarterComponent,
  ]
})
export class RecipeModuleModule { }

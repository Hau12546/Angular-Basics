import {
  RecipeEditComponent
} from './recipe/recipe-edit/recipe-edit.component';
import {
  RecipeListComponent
} from './recipe/recipe-list/recipe-list.component';
import {
  ShoppingListComponent
} from './shopping-list/shopping-list.component';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  RecipeComponent
} from './recipe/recipe.component';
import {
  RecipeDetailComponent
} from './recipe/recipe-detail/recipe-detail.component';
import { RecipeStarterComponent } from './recipe/recipe-starter/recipe-starter.component';

const routes: Routes = [{
    path: 'recipe',
    component: RecipeComponent,
    children: [
      {
        path:'',
        pathMatch:'full',
        component:RecipeStarterComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent
      },
      {
        path: '**',
        pathMatch:'full',
        component: RecipeStarterComponent
      },
    ]
  },
  {
    path: 'shopping',
    component: ShoppingListComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipe'
  }, {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'recipe'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

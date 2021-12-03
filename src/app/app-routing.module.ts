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
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { AuthGuardGuard } from './share/services/auth-guard-service/auth-guard.guard';

const routes: Routes = [
  {
    path:'authentication',
    component:AuthPageComponent
  },
  {
    path: 'recipe',
    component: RecipeComponent,
    canActivate:[AuthGuardGuard],
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
    redirectTo: 'authentication'
  }, {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'authentication'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

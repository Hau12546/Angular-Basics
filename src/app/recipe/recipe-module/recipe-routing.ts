import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { AuthGuardGuard } from 'src/app/share/services/auth-guard-service/auth-guard.guard';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeStarterComponent } from '../recipe-starter/recipe-starter.component';
import { RecipeComponent } from '../recipe.component';

export const RecipeRoutes: Routes = [

  {
    path: '',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(RecipeRoutes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {}

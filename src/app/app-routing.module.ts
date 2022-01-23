

import {
  NgModule
} from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';


const routes: Routes = [
  {
    path:'authentication',
    loadChildren:()=>import('./auth/auth/auth.module')
    .then(a=>a.AuthModule)
  },
  // {
  //   path: 'recipe',
  //   component: RecipeComponent,
  //   canActivate:[AuthGuardGuard],
  //   children: [
  //     {
  //       path:'',
  //       pathMatch:'full',
  //       component:RecipeStarterComponent
  //     },
  //     {
  //       path: 'new',
  //       component: RecipeEditComponent
  //     },
  //     {
  //       path: ':id',
  //       component: RecipeDetailComponent
  //     },
  //     {
  //       path: ':id/edit',
  //       component: RecipeEditComponent
  //     },
  //     {
  //       path: '**',
  //       pathMatch:'full',
  //       component: RecipeStarterComponent
  //     },
  //   ]
  // },
  {
      path:'recipe',
      loadChildren:()=>import('./recipe/recipe-module/recipe-module.module')
      .then(r=>r.RecipeModuleModule)
  },
  {
    path: 'shopping',
    loadChildren:()=>import('./shopping-list/shopping--route--scope/shopping--route--scope.module')
    .then(s=>s.ShoppingRouteScopeModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authentication'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'authentication'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

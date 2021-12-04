import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "../auth-page/auth-page.component";



const AuthRoutes: Routes = [
  {
    path:'',
    component:AuthPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

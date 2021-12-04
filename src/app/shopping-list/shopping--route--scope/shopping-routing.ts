import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "../shopping-list.component";

export const ShoppingRoutes: Routes = [
  {
    path:'',
    component:ShoppingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ShoppingRoutes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {}

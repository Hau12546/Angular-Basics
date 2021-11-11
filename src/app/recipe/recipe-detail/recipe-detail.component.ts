import { IngredientInfo } from './../../share/ingredient.model';
import { ShoppingService } from 'src/app/share/services/shopping-services/shopping.service';
import { RecipeInfo } from './../../share/recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input('RecipeDetail') RecipeDetail:Recipe = {name:'default', description:'default',imagePath:'default', IngredientList:[]};
  constructor(private ShoppingService:ShoppingService) { }

  ngOnInit(): void {
  }

  AddtoShopList(){
    // this.RecipeDetail.IngredientList.forEach((value:IngredientInfo)=>{
    //   this.ShoppingService.AddIngredient(value);
    // })
    this.CustomIgredientRecursion(this.RecipeDetail.IngredientList);
  }

  CustomIgredientRecursion(list:any[]):any{
    if(list.length>0){
      this.ShoppingService.AddIngredient(list.pop());
      return this.CustomIgredientRecursion(list=list);
    }
    return;
  }

}

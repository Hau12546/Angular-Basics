import { RecipeService } from './../share/services/recipe-services/recipe.service';
import { RecipeInfo } from './../share/recipe.model';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private recipeService:RecipeService) { }
  public Recipe:Recipe = {
    name: 'default', description: 'default', imagePath: 'default',
    IngredientList: []
  };
  ngOnInit(): void {
    this.RenderRecipeDetail();
  }

  RenderRecipeDetail(){
    this.recipeService.GetEmitter().subscribe((value:Recipe)=>{
      this.Recipe = value;
    })
  }
}

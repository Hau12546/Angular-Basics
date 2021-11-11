import { RecipeService } from './../../share/services/recipe-services/recipe.service';
import {RecipeInfo} from '../../share/recipe.model';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  Recipes: RecipeInfo[]  = [];
  // @Output('Emitter') Emitter:EventEmitter<RecipeInfo> = new EventEmitter();
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
   this.Recipes= this.recipeService.GetRecipes();
  }

  GetRecipeDetail(e:any){
    this.recipeService.GetEmitter().emit(e);
  }

}

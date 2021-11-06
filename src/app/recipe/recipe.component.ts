import { RecipeInfo } from './../share/recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor() { }
  public Recipe:RecipeInfo = {name:'default', description:'default',imagePath:'default'};
  ngOnInit(): void {
  }

  RenderRecipeDetail(e:any){
    this.Recipe = e;
  }
}

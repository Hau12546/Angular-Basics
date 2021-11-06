import { RecipeInfo } from './../../share/recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input('RecipeDetail') RecipeDetail:RecipeInfo = {name:'default', description:'default',imagePath:'default'};
  constructor() { }

  ngOnInit(): void {
  }

}

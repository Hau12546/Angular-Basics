import {
  RecipeService
} from './../../share/services/recipe-services/recipe.service';
import {
  RecipeInfo
} from '../../share/recipe.model';
import {
  Recipe
} from './../recipe.model';
import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  Recipes: RecipeInfo[] = [];
  // @Output('Emitter') Emitter:EventEmitter<RecipeInfo> = new EventEmitter();
  constructor(private recipeService: RecipeService, private route: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.Recipes = this.recipeService.GetRecipes();
  }

  GetRecipeDetail(e: any) {
    // console.log(e);
    this.recipeService.GetEmitter().emit(e);
    // this.route.navigate([e.name], {
    //   queryParams: {
    //     recipeID:e.id,
    //     recipeName: e.name,
    //     recipeDescription: e.description,
    //     image: e.imagePath
    //   },
    //   relativeTo:this.activeRoute,
    // });
  }



}

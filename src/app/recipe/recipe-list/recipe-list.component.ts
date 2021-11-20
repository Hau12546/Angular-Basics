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
  EventEmitter,
  OnDestroy
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  Recipes: RecipeInfo[] = [];
  SubscriptionList:Subscription[] = [];
  // @Output('Emitter') Emitter:EventEmitter<RecipeInfo> = new EventEmitter();
  constructor(private recipeService: RecipeService, private route: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.Recipes = this.recipeService.GetRecipes();
    this.RenderRecipeList();
    console.log(this.Recipes);
  }

  GetRecipeDetail(e: any) {
    // console.log(e);
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

  RenderRecipeList(){
    const Subscription1 =  this.recipeService.GetObservableEmitter().subscribe((value:Recipe[])=>{
      this.Recipes = [];
      this.Recipes = [...value];
    });
    this.AddSubsciption(Subscription1);
  };

  AddSubsciption(subscribe:Subscription){
    this.SubscriptionList.push(subscribe);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.SubscriptionList.forEach((subscribe:Subscription)=>{
      subscribe.unsubscribe();
    })
  }





}

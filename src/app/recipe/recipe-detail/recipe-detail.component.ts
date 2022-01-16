import { RecipeService } from './../../share/services/recipe-services/recipe.service';
import {
  IngredientInfo
} from './../../share/ingredient.model';
import {
  ShoppingService
} from 'src/app/share/services/shopping-services/shopping.service';
import {
  RecipeInfo, SaveOptions
} from './../../share/recipe.model';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {
  Recipe
} from '../recipe.model';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  Subscription
} from 'rxjs';
import { DataStorageService } from 'src/app/share/services/data-storage-service/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  @Input('RecipeDetail') RecipeDetail: Recipe = {
    id:0,
    name: 'default',
    description: 'default',
    imagePath: 'default',
    IngredientList: []
  };
  SubscriptionList: Subscription[] = [];
  constructor(private recipeService:RecipeService,private ShoppingService: ShoppingService, private route: Router, private activeRoute: ActivatedRoute
  ,private render:Renderer2, private el:ElementRef, private dataService:DataStorageService) {}
  EditRecipe:boolean = false;
  Recipe:RecipeInfo = {};
  ngOnInit(): void {
    // this.GetRecipeDetailsFromQueryParams();
    this.GetRecipeDetailsFromParams();
    this.GetRemoveRecipe();
    this.SaveRecipeToDB();
  }

  AddtoShopList() {
    // this.RecipeDetail.IngredientList.forEach((value:IngredientInfo)=>{
    //   this.ShoppingService.AddIngredient(value);
    // })
    // this.CustomIgredientRecursion(this.RecipeDetail.IngredientList);
    this.ShoppingService.AddIngredient(this.RecipeDetail.IngredientList);
  }

  // GetRecipeDetailsFromQueryParams() {
  //   const Subscription1 = this.activeRoute.queryParams.subscribe((recipe: Params) => {
  //     // this.RecipeDetail.name = recipe.recipeName;
  //     // this.RecipeDetail.description = recipe.recipeDescription;
  //     // this.RecipeDetail.imagePath = recipe.image;
  //     this.RecipeDetail = this.GetRecipeFromRecipeService(recipe.recipeID) || {
  //       id:0,
  //       name: 'default',
  //       description: 'default',
  //       imagePath: 'default',
  //       IngredientList: []
  //     };
  //   });
  //   this.AddSubscription(Subscription1);
  // }

  GetRecipeDetailsFromParams() {
    const Subscription2 = this.activeRoute.params.subscribe((recipe: Params) => {
      this.RecipeDetail = this.GetRecipeFromRecipeService(recipe.id) || {
        id:0,
        name: 'default',
        description: 'default',
        imagePath: 'default',
        IngredientList: []
      };
    });
    this.AddSubscription(Subscription2);
  }

  SaveRecipeToDB(){
    const Subscription3 =  this.recipeService.SaveDataBaseSignal.subscribe((value:SaveOptions)=>{
      if(value.single) this.dataService.SaveRecipe(this.RecipeDetail);
    });
    this.AddSubscription(Subscription3);
  }

  GetRecipeFromRecipeService(id:number){
    return this.recipeService.GetSingleRecipe(id)
  }

  AddSubscription(subscribe: Subscription) {
    this.SubscriptionList.push(subscribe);
  }

  CustomIgredientRecursion(list: any[]): any {
    if (list.length > 0) {
      this.ShoppingService.AddIngredient(list.pop());
      return this.CustomIgredientRecursion(list = list);
    }
    return;
  }

  GetRemoveRecipe(){
    const Subscription3 =  this.recipeService.RemoveRecipeEmitter.subscribe((value:RecipeInfo)=>{
      this.EditRecipe = true;
      this.Recipe = value;
    });
    this.AddSubscription(Subscription3);
  };

  DeleteRecipe(){
    if(Object.values(this.Recipe).length == 0 && Object.values(this.RecipeDetail).length > 0)
    {
      this.recipeService.RemoveRecipe(this.RecipeDetail);
      this.route.navigate(['/recipe'])
      return;
    };

    if(Object.values(this.Recipe).length > 0)
    {
      this.recipeService.RemoveRecipe(this.RecipeDetail);
      this.route.navigate(['/recipe'])
      return;
    };


  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.SubscriptionList.forEach((subscribe: Subscription) => {
      subscribe.unsubscribe();
    })
  }

}

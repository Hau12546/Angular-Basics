import { SaveOptions } from './../../share/recipe.model';
import { DataStorageService } from './../../share/services/data-storage-service/data-storage.service';
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
  constructor(private recipeService: RecipeService, private route: Router, private activeRoute: ActivatedRoute,
    private dataService:DataStorageService) {}

  ngOnInit() {
    this.InitialProcessing();
    this.RenderRecipeList();
    this.GetRecipeFromDB();
    this.SaveAllRecipes();
  }

   InitialProcessing(){
    // this.recipeService.GetRecipes().subscribe((value:any)=>{
    //   this.Recipes = value;
    // });;
    this.Recipes =  this.recipeService.GetRecipes();
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
  GetRecipeFromDB(){
    const Subscription2 =  this.recipeService.FetchDataBaseSignal.subscribe((value:boolean)=>{
        this.dataService.FetchRecipe().subscribe((value:RecipeInfo[])=>{
          if(value.length>0) this.Recipes = value;
        });
    });
    this.SubscriptionList.push(Subscription2);
  };

  SaveAllRecipes(){
    const Subscription3 = this.recipeService.SaveDataBaseSignal.subscribe((value:SaveOptions)=>{
      this.dataService.SaveRecipe(this.Recipes);
    });
    this.AddSubsciption(Subscription3);
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

import { RecipeInfo, SaveOptions } from './../../recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipe/recipe.model';
import { IngredientInfo, Ingredients } from '../../ingredient.model';
import { Subject } from 'rxjs';
import { DataStorageService } from '../data-storage-service/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private Recipes: Recipe[] = [
    // new Recipe('pad kra pao1',
    // 'Minced offcut stalks and skins bring body and flavour to many dishes, such as this pad kra pao',
    // 'https://i.guim.co.uk/img/media/1e1d7ce465772ce9454a7d8adbdfcb683ad367db/0_0_4992_3328/master/4992.jpg?width=1020&quality=85&auto=format&fit=max&s=22b143f1d34cb4983d5dc2dccc520c2a',
    // [ new Ingredients('ginger',16), new Ingredients('peper',20)]),
    // new Recipe('pad kra pao12',
    // 'Minced offcut stalks and skins bring body and flavour to many dishes, such as this pad kra pao',
    // 'https://i.guim.co.uk/img/media/1e1d7ce465772ce9454a7d8adbdfcb683ad367db/0_0_4992_3328/master/4992.jpg?width=1020&quality=85&auto=format&fit=max&s=22b143f1d34cb4983d5dc2dccc520c2a',
    // [ new Ingredients('ginger',16), new Ingredients('peper',20)])
  ];
  private ObservableEmitter = new Subject<Recipe[]>();
  private Emitter:EventEmitter<RecipeInfo> = new EventEmitter();
  public RemoveRecipeEmitter = new Subject<RecipeInfo>();
  public SaveDataBaseSignal = new Subject<SaveOptions>();
  public FetchDataBaseSignal = new Subject<boolean>();

  constructor() {

  }

   IntializeDataFromDB(list:any[] = []){
    if(list.length>0) this.Recipes = list;
    this.SendObservableList();
  }

  GetRecipes(){
    return this.Recipes.slice();
  };

  GetSingleRecipe(id:number = -1){
    if(id>0){
      const TargetRecipe= this.Recipes.find((value:Recipe)=>value.id == id);
      return TargetRecipe;
    }
    throw new Error('No recipe found!!!')
  }

  GetEmitter(){
    return this.Emitter;
  }

  GetObservableEmitter(){
    return this.ObservableEmitter;
  }

  AddRecipe(recipe:any = {}){
    if(Object.values(recipe).length>0){
      this.Recipes.push(recipe);
      this.SendObservableList();
    }
  };

  SendObservableList(){
    this.ObservableEmitter.next(this.Recipes.slice());
  }

  SendSignalToSaveInDataBase(saveSignal:SaveOptions = {}, fetchSignal:boolean = false ){
    if(saveSignal.single) this.SaveDataBaseSignal.next(saveSignal);
    if(saveSignal.all) this.SaveDataBaseSignal.next(saveSignal);
    if(fetchSignal) this.FetchDataBaseSignal.next(fetchSignal);
  }

  SendRecipe(recipe:RecipeInfo = {}){
    this.RemoveRecipeEmitter.next(recipe);
  }

  UpdateRecipe(id:number = -1, recipe:any = {}){
    if(id<0) throw new Error('409 Conflict');
    const index = this.Recipes.findIndex(value=>value.id == id);
    this.Recipes[index].id = recipe.id;
    this.Recipes[index].name = recipe.name;
    this.Recipes[index].imagePath = recipe.imagePath;
    this.Recipes[index].description = recipe.description;
    this.Recipes[index].IngredientList = [];
    recipe.IngredientList.forEach((value:IngredientInfo)=>{
      this.Recipes[index].IngredientList.push(value);
    });
    this.SendObservableList();
  };

  RemoveRecipe(recipe:RecipeInfo = {}){
    if(Object.values(recipe).length>0){
      this.Recipes.splice(this.Recipes.findIndex(value=>value.id == recipe.id),1);
      this.SendObservableList();
      return;
    }
    throw new Error('502 Bad Gateway');
  }

}

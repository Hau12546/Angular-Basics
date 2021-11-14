import { RecipeInfo } from './../../recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipe/recipe.model';
import { Ingredients } from '../../ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private Recipes: Recipe[] = [
    new Recipe('pad kra pao1',
    'Minced offcut stalks and skins bring body and flavour to many dishes, such as this pad kra pao',
    'https://i.guim.co.uk/img/media/1e1d7ce465772ce9454a7d8adbdfcb683ad367db/0_0_4992_3328/master/4992.jpg?width=1020&quality=85&auto=format&fit=max&s=22b143f1d34cb4983d5dc2dccc520c2a',
    [ new Ingredients('ginger',16), new Ingredients('peper',20)]),
    new Recipe('pad kra pao12',
    'Minced offcut stalks and skins bring body and flavour to many dishes, such as this pad kra pao',
    'https://i.guim.co.uk/img/media/1e1d7ce465772ce9454a7d8adbdfcb683ad367db/0_0_4992_3328/master/4992.jpg?width=1020&quality=85&auto=format&fit=max&s=22b143f1d34cb4983d5dc2dccc520c2a',
    [ new Ingredients('ginger',16), new Ingredients('peper',20)])
  ];
  private Emitter:EventEmitter<RecipeInfo> = new EventEmitter();
  constructor() { }

  GetRecipes(){
    return this.Recipes.slice();
  }

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

}

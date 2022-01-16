import {createFeatureSelector, createSelector} from '@ngrx/store';
import { throwError } from 'rxjs';
import { IngredientInfo, ShoppingState } from 'src/app/share/ingredient.model';



export const GetIngredients = createSelector(
  createFeatureSelector('ShopEntries'),
  (state:ShoppingState)=>{
    const NewList =  DeepClone(state);
    NewList.Ingredients = NewList.Ingredients.map((value:IngredientInfo)=>{
      return {
        ...value,
        onFocus:false
      };
    })
    return NewList;
  }
);


function DeepClone(object={}){
  return JSON.parse(JSON.stringify({...object}));
}

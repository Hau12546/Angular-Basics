import { Action, createAction, props } from "@ngrx/store";
import { IngredientInfo, Ingredients } from "src/app/share/ingredient.model";

export const ShoppingActions ={
  ADD_INGREDIENT:'ADD_INGREDIENT',
  UPDATE_INGREDIENT:'UPDATE_INGREDIENT',
  MULTIPLE_INGREDIENTS:'MULTIPLE_INGREDIENTS',
  CLEAR_INGREDIENTS:'CLEAR_INGREDIENTS',
  DELETE_INGREDIENTS:'DELETE_INGREDIENTS',
  // SINGLE_INGREDIENTS:'SINGLE_INGREDIENTS',
};


export const AddIngredient =  createAction(ShoppingActions.ADD_INGREDIENT,props<{payload:IngredientInfo}>());

export const AddMultipleIngredient = createAction(ShoppingActions.MULTIPLE_INGREDIENTS,props<{payload:IngredientInfo[]}>());

export const UpdateIngredient = createAction(ShoppingActions.UPDATE_INGREDIENT,props<{payload:IngredientInfo}>());
export const ClearIngredients = createAction(ShoppingActions.CLEAR_INGREDIENTS);
export const DeleteIngredients = createAction(ShoppingActions.DELETE_INGREDIENTS,props<{payload:number}>());
// export const GetSingleIngredient = createAction(ShoppingActions.SINGLE_INGREDIENTS,props<{payload:number}>());







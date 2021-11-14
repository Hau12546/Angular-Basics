import { IngredientInfo } from './ingredient.model';
export interface RecipeInfo  {
  id?:number,
  name?:string,
  description?:string,
  imagePath?:string,
  IngredientList?:IngredientInfo[]
}

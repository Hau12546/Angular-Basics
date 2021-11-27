import { IngredientInfo } from './ingredient.model';
export interface RecipeInfo  {
  id?:number,
  name?:string,
  description?:string,
  imagePath?:string,
  IngredientList?:IngredientInfo[]
}


export interface SaveOptions{
  single?:boolean,
  all?:boolean
}

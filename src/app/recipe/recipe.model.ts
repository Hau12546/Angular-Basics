import { IngredientInfo } from './../share/ingredient.model';
export class Recipe{
  public id:number=0;
	public name:string='';
	public description:string='';
	public imagePath:string='';
  public IngredientList:IngredientInfo[] = [];
	constructor(name:string,description:string,imagePath:string, ingredient:IngredientInfo[]){
    this.id = name.length;
		this.name = name;
		this.description = description;
		this.imagePath = imagePath;
    this.IngredientList = ingredient;
	}
}

export class Ingredients{
	public name:string='';
	public amount:number=0;
  public onFocus:boolean = false;
	constructor(name:string, amount:number){
		this.name= name;
		this.amount = amount;
    this.onFocus = false;
	}
}

export interface IngredientInfo {
  name?:string,
  amount:number,
  onFocus?:boolean
}


export interface ShoppingState {
  Ingredients:IngredientInfo[],
}

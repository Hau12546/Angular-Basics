export class Ingredients{
	public name:string='';
	public Amount:number=0;
	constructor(name:string, amount:number){
		this.name= name;
		this.Amount = amount;
	}
}

export interface IngredientInfo {
  name?:string,
  amount:number
}

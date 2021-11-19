export class Ingredients{
	public name:string='';
	public amount:number=0;
	constructor(name:string, amount:number){
		this.name= name;
		this.amount = amount;
	}
}

export interface IngredientInfo {
  name?:string,
  amount:number,
  onFocus?:boolean
}

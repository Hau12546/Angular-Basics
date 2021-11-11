import { IngredientInfo } from './../../ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private IngredientList:IngredientInfo[] =[];
  private Emitter:EventEmitter <IngredientInfo[]>= new EventEmitter();
  constructor() { }

  GetIngredientList(){
    return this.IngredientList.slice();
  }

  GetEmitter(){
    return this.Emitter;
  }

  AddIngredient(ingredient:IngredientInfo){
    if(this.IngredientList.map((value)=>{return value.name}).includes(ingredient.name)){
      const index = this.IngredientList.findIndex((value:IngredientInfo)=>value.name == ingredient.name);
      if(Number(index)!=undefined || Number(index)!=NaN){
        this.IngredientList[index].amount=Number(this.IngredientList[index].amount)+Number(ingredient.amount);
        // console.log(this.IngredientList[index]);
        this.Emitter.emit(this.IngredientList.slice());
        return;
      }
    }
    this.IngredientList.push(ingredient);
    this.Emitter.emit(this.IngredientList.slice());
  }

  ResetIngredients(){
    this.IngredientList = [];
  }
}

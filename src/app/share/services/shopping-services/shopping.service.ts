import { IngredientInfo } from './../../ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private IngredientList:IngredientInfo[] =[];
  private Emitter:EventEmitter <IngredientInfo[]>= new EventEmitter();
  private ObservableEmitter = new Subject<number>();
  constructor() { }

  GetIngredientList(){
    return this.IngredientList.slice();
  }

  GetEmitter(){
    return this.Emitter;
  }

  GetObservableEmitter(){
    return this.ObservableEmitter;
  }

  GetIngredientDetail(index:number = -1){
    if(index <0) throw new Error('401 Unauthorized (RFC 7235)');
    return this.IngredientList.slice()[index];
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

  UpdateIngredient(ingredient:IngredientInfo){
    if(this.IngredientList.map((value)=>{return value.name}).includes(ingredient.name)){
      const index = this.IngredientList.findIndex((value:IngredientInfo)=>value.name == ingredient.name);
      if(Number(index)!=undefined || Number(index)!=NaN){
        this.IngredientList[index].amount=Number(ingredient.amount);
        this.Emitter.emit(this.IngredientList.slice());
        return;
      }
    };
    this.IngredientList.push(ingredient);
    this.Emitter.emit(this.IngredientList.slice());
  }

  DeleteIngredient(index:number){
    if(index<0) throw new Error('406 Not Acceptable');
    this.IngredientList.splice(index,1);
    this.Emitter.emit(this.IngredientList.slice());
  }

  ResetIngredients(){
    this.IngredientList = [];
  }
}

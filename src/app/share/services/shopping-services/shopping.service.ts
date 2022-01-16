import { Store } from '@ngrx/store';
import * as ShopAction from "../../../shopping-list/shopping-store/shopping-action";
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
  constructor(private store:Store) { }

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

  AddIngredient(ingredients:IngredientInfo[]){
    // if(this.IngredientList.map((value)=>{return value.name}).includes(ingredient.name)){
    //   const index = this.IngredientList.findIndex((value:IngredientInfo)=>value.name == ingredient.name);
    //   if(Number(index)!=undefined || Number(index)!=NaN){
    //     this.IngredientList[index].amount=Number(this.IngredientList[index].amount)+Number(ingredient.amount);
    //     this.Emitter.emit(this.IngredientList.slice());
    //     return;
    //   }
    // }
    // this.IngredientList.push(ingredient);
    // this.Emitter.emit(this.IngredientList.slice());
    this.store.dispatch(ShopAction.AddMultipleIngredient({payload:ingredients}));
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

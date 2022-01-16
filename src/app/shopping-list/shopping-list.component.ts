import { Store } from '@ngrx/store';
import { Ingredients, IngredientInfo, ShoppingState } from './../share/ingredient.model';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ShoppingService } from '../share/services/shopping-services/shopping.service';
import { Observable } from 'rxjs';
import * as ShopAction from './shopping-store/shopping-action';
import { GetIngredients } from './shopping-store/shopping-selectors';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  IngredientList: Observable<ShoppingState> = new Observable();
  TempList:IngredientInfo[] = [];
  PreIndex:number = -1;
  // Temp:IngredientInfo = {name:'default',amount:0};
   regex = /focus/g;
  constructor(
    private shopService:ShoppingService,
    private el:ElementRef,
    private render:Renderer2,
    private store:Store) { }

  ngOnInit() {
    this.IngredientList =  this.store.select(GetIngredients);
    this.store.select(GetIngredients).subscribe((value:ShoppingState)=>{
      this.TempList = value.Ingredients;
    });
    // this.RenderIngredients();
    // this.shopService.GetEmitter().subscribe((value:IngredientInfo[])=>{
    //   this.IngredientList = value;
    // });
  }

  RenderIngredients(){
    // this.IngredientList= this.shopService.GetIngredientList();
  }

  GetRemoveData(index:number){

    this.TempList.forEach((value:IngredientInfo)=>{
      value.onFocus =false;
    });
    if(index === this.PreIndex) {
      this.TempList[index].onFocus = false;
      this.PreIndex = -1;
      this.shopService.GetObservableEmitter().next(-1);
      return;
    }
    this.TempList[index].onFocus = true;
    this.PreIndex = index;
    this.shopService.GetObservableEmitter().next(index);
  }
}

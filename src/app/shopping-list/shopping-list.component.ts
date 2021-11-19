import { Ingredients, IngredientInfo } from './../share/ingredient.model';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ShoppingService } from '../share/services/shopping-services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  IngredientList:IngredientInfo[] =[];
  // Temp:IngredientInfo = {name:'default',amount:0};
   regex = /focus/g;
  constructor(private shopService:ShoppingService, private el:ElementRef, private render:Renderer2) { }

  ngOnInit() {
    this.RenderIngredients();
    this.shopService.GetEmitter().subscribe((value:IngredientInfo[])=>{
      this.IngredientList = value;
    })
  }

  RenderIngredients(){
    this.IngredientList= this.shopService.GetIngredientList();
  }

  GetRemoveData(index:number){
    this.IngredientList.forEach((value:IngredientInfo)=>{
      value.onFocus  =false;
    });
    this.IngredientList[index].onFocus = true;
    this.shopService.GetObservableEmitter().next(index);
  }
}

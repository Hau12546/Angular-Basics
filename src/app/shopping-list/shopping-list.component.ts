import { Ingredients, IngredientInfo } from './../share/ingredient.model';
import { Component, OnInit } from '@angular/core';
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
  constructor(private shopService:ShoppingService) { }

  ngOnInit() {
    this.RenderIngredients();
    this.shopService.GetEmitter().subscribe((value:IngredientInfo[])=>{
      this.IngredientList = value;
    })
  }

  RenderIngredients(){
    this.IngredientList= this.shopService.GetIngredientList();
  }

  GetRemoveData(ingredient:IngredientInfo, e:any){
    console.log(e.getAttribute('class').match(this.regex));
    (e.getAttribute('class').match(this.regex))? e.classList.remove('focus'): e.classList.add('focus');
  }
}

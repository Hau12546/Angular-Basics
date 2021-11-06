import { Ingredients, IngredientInfo } from './../share/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  IngredientList:IngredientInfo[] =[];
  Temp:IngredientInfo = {name:'default',amount:0};
   regex = /focus/g;
  constructor() { }

  ngOnInit() {

  }

  RenderIngredients(e:any){
    this.Temp.name = e.name;
    this.Temp.amount = e.amount;
  }

  GetRemoveData(ingredient:IngredientInfo, e:any){
    this.Temp= ingredient;
    console.log(e.getAttribute('class').match(this.regex));
    (e.getAttribute('class').match(this.regex))? e.classList.remove('focus'): e.classList.add('focus');
  }

  AddIngredients(){
    // if(this.IngredientList.map((value)=>{return value.name}).includes(this.Temp.name)){
    //   const index = this.IngredientList.findIndex(value=>value.name == this.Temp.name);
    //   if(index != -1){
    //     console.log(this.Temp.amount)
    //     this.IngredientList[index].amount=Number(this.IngredientList[index].amount)+Number(this.Temp.amount);
    //     console.log(this.IngredientList[index]);
    //     return;
    //   }
    // }
    if(this.Temp.name !='default' || this.Temp.amount >0){
      this.IngredientList.push(this.Temp);
    }
  }

  DeleteIngredients(){
    if(this.IngredientList.map((value)=>{return value.name}).includes(this.Temp.name)){
      const index = this.IngredientList.findIndex(value=>value.name == this.Temp.name);
      if(index != -1){
        this.Temp = {name:'',amount:0};
        this.IngredientList.splice(index,1);
        return;
      }
    }
  }

  ClearIngredients(){
    this.IngredientList = [];
  }
}

import { IngredientInfo } from './../../share/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') IngredientsName:ElementRef|undefined;
  @ViewChild('amountInput') IngredientsAmount:ElementRef|undefined;
  @Output('Emitter') Emitter:EventEmitter<IngredientInfo> = new EventEmitter();
  @Input('IngredientData') public Ingredients:IngredientInfo = {name:'default',amount:0};
  constructor() { }

  ngOnInit() {
  }

  GetIngredientName(){
    try {
      if(this.IngredientsName?.nativeElement.value){
        this.Ingredients.name= this.IngredientsName?.nativeElement.value;
        this.SendIngredients();
        return;
      }
      throw new Error("No Ingredient's Name found");
    } catch (error) {
      alert(error);
    }
  }

  GetIngredientAmount(){
    try {
      if(this.IngredientsAmount?.nativeElement.value){
        this.Ingredients.amount= this.IngredientsAmount?.nativeElement.value;
        this.SendIngredients();
        return;
      }
      throw new Error("No Ingredient's Amount found");
    } catch (error) {
      alert(error);
    }
  }

  SendIngredients(){
    if(this.Ingredients.name && this.Ingredients.amount){
      console.log(this.Ingredients);
      this.Emitter.emit(this.Ingredients);
    }
  }

}

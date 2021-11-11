import { IngredientInfo } from './../../share/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ShoppingService } from 'src/app/share/services/shopping-services/shopping.service';

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
  constructor(private shopService:ShoppingService) { }

  ngOnInit() {
  }


  AddIngredients(){
    if(this.IngredientsName?.nativeElement.value && this.IngredientsAmount?.nativeElement.value >0){
      const Ingredient = {name:this.IngredientsName?.nativeElement.value, amount:this.IngredientsAmount?.nativeElement.value};
      this.shopService.AddIngredient(Ingredient);
    }
  }

  DeleteIngredients(){
    // if(this.IngredientList.map((value)=>{return value.name}).includes(ingredient.name)){
    //   const index = this.IngredientList.findIndex(value=>value.name == ingredient.name);
    //   if(index != -1){
    //     ingredient = {name:'',amount:0};
    //     this.IngredientList.splice(index,1);
    //     return;
    //   }
    // }
  }

  ClearIngredients(){
    this.shopService.ResetIngredients();
  }

}

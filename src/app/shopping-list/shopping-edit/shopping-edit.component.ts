import { IngredientInfo } from './../../share/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ShoppingService } from 'src/app/share/services/shopping-services/shopping.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput') IngredientsName:ElementRef|undefined;
  // @ViewChild('amountInput') IngredientsAmount:ElementRef|undefined;
  @Output('Emitter') Emitter:EventEmitter<IngredientInfo> = new EventEmitter();
  @Input('IngredientData') public Ingredients:IngredientInfo = {name:'default',amount:0};
  @ViewChild('Ingredient') Ingredient:NgForm | undefined;
  EditMode:boolean = false;
  EditIngredientIndex:number=-1;
  constructor(private shopService:ShoppingService) { }

  ngOnInit() {
    this.GetEditingItem();
    this.GetEditingItem();
  }

  GetEditingItem(){
    this.shopService.GetObservableEmitter().subscribe((value:number)=>{
      this.EditMode = true;
      const EditingIngredient =  this.shopService.GetIngredientDetail(value);
      this.EditIngredientIndex  = value;
      this.Ingredient?.setValue({
        'IngredientName':EditingIngredient.name,
        'IngredientAmount':EditingIngredient.amount,
      });
    });
  };

  AddIngredients(){
    console.log(this.Ingredient)
    if(this.Ingredient?.value.IngredientName && this.Ingredient?.value.IngredientAmount>0){
      const Ingredient = {name:this.Ingredient?.value.IngredientName, amount:this.Ingredient?.value.IngredientAmount};
      this.shopService.AddIngredient(Ingredient);
    }
    this.ResetIngredientForm();
  }

  UpdateIngredients(){
    const temp = this.shopService.GetIngredientDetail(this.EditIngredientIndex);
    temp.name  = this.Ingredient?.value.IngredientName;
    temp.amount =  this.Ingredient?.value.IngredientAmount;
    this.shopService.UpdateIngredient(temp);
    this.ResetIngredientForm();
    this.ClearEditMode();
  }

  ResetIngredientForm(){
    this.Ingredient?.reset();
  }

  ClearEditMode(){
    this.EditMode = false;
    this.EditIngredientIndex = -1;
  }

  DeleteIngredients(){
    this.shopService.DeleteIngredient(this.EditIngredientIndex);
    this.ClearEditMode();
  }

  ClearIngredients(){
    this.shopService.ResetIngredients();
  }

}

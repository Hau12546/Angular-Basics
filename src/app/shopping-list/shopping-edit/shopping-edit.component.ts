import { Store } from '@ngrx/store';
import { IngredientInfo, ShoppingState } from './../../share/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ShoppingService } from 'src/app/share/services/shopping-services/shopping.service';
import { NgForm } from '@angular/forms';
import * as ShopAction from "../shopping-store/shopping-action"
import { GetIngredients } from '../shopping-store/shopping-selectors';
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
  EditingIngredient:IngredientInfo | undefined;
  constructor(private shopService:ShoppingService,
    private store:Store,) { }

  ngOnInit() {
    this.GetEditingItem();
    // this.GetEditingItem();
  }

  GetEditingItem(){
    this.shopService.GetObservableEmitter().subscribe((index:number)=>{
      if(index<0) {
        this.ResetIngredientForm();
        this.ClearEditMode();
        return;
      }
      this.EditMode = true;
      this.store.select(GetIngredients).subscribe((value:ShoppingState)=>{
        this.EditingIngredient = value.Ingredients[index];
      });
      // const EditingIngredient =  this.shopService.GetIngredientDetail(value);
      this.EditIngredientIndex  = index;
      console.log(this.EditingIngredient);
      this.Ingredient?.setValue({
        'IngredientName':this.EditingIngredient?.name,
        'IngredientAmount':this.EditingIngredient?.amount,
      });
    });
  };

  AddIngredients(){
    if(this.Ingredient?.value.IngredientName && this.Ingredient?.value.IngredientAmount>0){
      const Ingredient = {name:this.Ingredient?.value.IngredientName, amount:this.Ingredient?.value.IngredientAmount};
      console.log(Ingredient);
      this.store.dispatch(ShopAction.AddIngredient({payload:Ingredient}));
    }
    this.ResetIngredientForm();
  }

  UpdateIngredients(){
    // const temp = this.shopService.GetIngredientDetail(this.EditIngredientIndex);
    // temp.name  = this.Ingredient?.value.IngredientName;
    // temp.amount =  this.Ingredient?.value.IngredientAmount;
    // this.shopService.UpdateIngredient(temp);
    this.store.dispatch(ShopAction.UpdateIngredient({payload:{name:this.Ingredient?.value.IngredientName,amount:this.Ingredient?.value.IngredientAmount}}));
    this.ClearEditMode();
    this.ResetIngredientForm();
  }

  ResetIngredientForm(){
    this.Ingredient?.reset();
  }

  ClearEditMode(){
    this.EditMode = false;
    this.EditIngredientIndex = -1;
  }

  DeleteIngredients(){
    // this.shopService.DeleteIngredient(this.EditIngredientIndex);
    this.store.dispatch(ShopAction.DeleteIngredients({payload:this.EditIngredientIndex}));
    this.ResetIngredientForm();
    this.ClearEditMode();
  }

  ClearIngredients(){
    // this.shopService.ResetIngredients();
    this.store.dispatch(ShopAction.ClearIngredients());
  }

}

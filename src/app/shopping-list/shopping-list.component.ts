import { Store } from '@ngrx/store';
import { Ingredients, IngredientInfo, ShoppingState } from './../share/ingredient.model';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ShoppingService } from '../share/services/shopping-services/shopping.service';
import { Observable } from 'rxjs';
import * as ShopAction from './shopping-store/shopping-action';
import { GetIngredients } from './shopping-store/shopping-selectors';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations:[
    trigger('divState',[
      state('normal',style({
        'background-color':'red',
        transform:'translatex(0)'
      })),
      state('highlighted',style({
        'background-color':'transparent',
        transform:'translatex(100%) scale(0)'
      })),
      transition('normal <=> highlighted',animate('1s ease-out')),
      // transition('highlighted => normal',animate('1s ease-out')),
    ]),
    trigger('WildState',[
      state('normal',style({
        'background-color':'blue',
        transform:'translatex(0)'
      })),
      state('highlighted',style({
        'background-color':'purple',
        // transform:'translatex(-100%) scale(0)'
      })),
      state('shurken',style({
        'background-color':'blue',
        transform:'scale(0.5)'
      })),
      transition('normal <=> highlighted',animate('1s ease-out')),
      transition('shurken <=> *',[style({
        'background-color':'orange'
      }),animate('.5s ease-out',style({
        borderRadius:'50px'
      })),animate('.2s ease-out')
    ]),
    ]),

    trigger('list',[
      state('in',style({
        opacity:1,
        transform:'translatex(0)'
      }),),
      // transition('void <=> *',[
      //   style({
      //   opacity:0,
      //   transform:'translatex(-100%)'
      // })
      // ,animate('.8s ease-in-out')])
      transition('void <=> *',
      animate('1s ease-in-out',keyframes([style({
        opacity:0,
        transform:'translatex(-100%)'
      })])))
    ]),
  ]
})
export class ShoppingListComponent implements OnInit {
  IngredientList: Observable<ShoppingState> = new Observable();
  TempList:IngredientInfo[] = [];
  PreIndex:number = -1;
  // Temp:IngredientInfo = {name:'default',amount:0};
   regex = /focus/g;
   state:string='normal';
   WildState:string ='normal';
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

  animationStarted(event:any){
    console.log(event);
  }

  animationDone(event:any){
    console.log(event);
  }

  GetRemoveData(index:number){
    // (this.WildState==='normal')?this.WildState='highlighted':this.WildState='normal';
    this.WildState = 'normal';
    this.WildState='highlighted';
    this.WildState = 'shurken';
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

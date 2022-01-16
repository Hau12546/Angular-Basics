import { IngredientInfo, Ingredients, ShoppingState } from "src/app/share/ingredient.model";
import { Action, createReducer,ActionReducer , on, INIT, UPDATE, ActionReducerMap } from "@ngrx/store";
import * as ShopAction from "./shopping-action";
import { ShoppingActions } from "./shopping-action";

const InitialState:ShoppingState = {
Ingredients:[
{name:'Tomato',amount:12,onFocus:false},
{name:'Potato',amount:10,onFocus:false},
]
};


export const ShoppingReducer = createReducer(
  InitialState,
  on(ShopAction.AddIngredient,(state,action)=>{
    const NewIngredientList = JSON.parse(JSON.stringify({...state}));
    if(NewIngredientList.Ingredients.map((value:IngredientInfo)=>value.name).includes(action.payload.name)){
      NewIngredientList.Ingredients[NewIngredientList.Ingredients.map((value:IngredientInfo)=>value.name).findIndex((value:string)=>value===action.payload.name)].amount+=action.payload.amount;
      // return {
      //   ...NewIngredientList,
      //   Ingredients:[...NewIngredientList.Ingredients],
      // };
    }else{
      NewIngredientList.Ingredients.push(action.payload);
    }
    return {
      ...NewIngredientList,
      Ingredients:[...NewIngredientList.Ingredients],
    };
  }),
  on(ShopAction.AddMultipleIngredient,(state,action)=>{
    let NewIngredientList = JSON.parse(JSON.stringify({...state}));
    action.payload.forEach((value:IngredientInfo,index)=>{
      let IsExisting = NewIngredientList.Ingredients.map((value:IngredientInfo)=>value.name).includes(value.name);
      if(IsExisting){
        const TargetIndex = NewIngredientList.Ingredients.findIndex((NewIngredient:IngredientInfo)=>NewIngredient.name == value.name);
        NewIngredientList.Ingredients[TargetIndex].amount+=value.amount;
      }else{
        NewIngredientList.Ingredients.push(value);
      }
    });
    return {
      ...state,
      Ingredients:[...NewIngredientList.Ingredients]
    };
  }),
  on(ShopAction.UpdateIngredient,(state,action)=>{
    const NewList = DeepClone(state);
    NewList.Ingredients= NewList.Ingredients.map((value:IngredientInfo)=>{
      if(value.name === action.payload.name){
        return  {...action.payload};
      }
      return value;
    });
    console.log(NewList.Ingredients);
    return {
      ...NewList,
      Ingredients:[...NewList.Ingredients]
    };
  }),

  on(ShopAction.ClearIngredients,(state)=>{
    return {
      ...state,
      Ingredients:[]
    };
  }),
  on(ShopAction.DeleteIngredients,(state,action)=>{
    const NewList = DeepClone(state);
    NewList.Ingredients.splice(action.payload,1);
    return {
      ...NewList,
      Ingredients:[...NewList.Ingredients]
    }
  }),
);

export const metaReducerLocalStorage = (reducer:ActionReducer<any>):ActionReducer<any>=>{
  return (state,action)=>{
    if(action.type===INIT  || action.type === UPDATE){
      const storageValue =  JSON.parse(localStorage.getItem('state')||JSON.stringify("{}"));
      if(Object.values(storageValue).length>0){
        try {
          return storageValue;
        } catch (error) {
          localStorage.removeItem('state');
        }
      }
    }
    const nextState = reducer(state,action);
    localStorage.setItem('state',JSON.stringify(nextState));
    return nextState;
  }
}


function DeepClone(object:any={}){
  if(Object.values(object).length===0){
    throw new Error("Object is Empty");
  }
  return JSON.parse(JSON.stringify({...object}));
}


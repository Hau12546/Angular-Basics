// import { appReducer } from './../../store/app-reducer';
import { User } from './../../user.model';
import {
  IngredientInfo,
  Ingredients,
  ShoppingState
} from "src/app/share/ingredient.model";
import {
  Action,
  createReducer,
  ActionReducer,
  on,
  INIT,
  UPDATE,
  ActionReducerMap
} from "@ngrx/store";
import * as fromAuthStore from './auth-action';
// import * as ShopAction from "./shopping-action";
// import {
//   ShoppingActions
// } from "./shopping-action";

export interface State {
  userInfo:{
    email:string,
    userId:string,
    token:string,
    expirationDate:Date
  },
  AuthErrorMsg:string|null,
  IsLoading:boolean
}

const InitialState:State = {
  userInfo:{
    email:'',
    userId:'',
    token:'',
    expirationDate: new Date()
  },
  AuthErrorMsg:null,
  IsLoading:false
}

export  const authReducer  = createReducer(
  InitialState,
  on(fromAuthStore.Login,(state,action)=>{
    const NewUserState = DeepClone(state);
    const LoginInfo = new User(action.payload.email, action.payload.userId,
      action.payload.token, action.payload.expirationDate)
    console.log(NewUserState);
    return {
      ...NewUserState,
      AuthErrorMsg:null,
      IsLoading:false,
      userInfo:LoginInfo
    }
  }),
  on(fromAuthStore.LoginStart,(state,action)=>{
    const MutableLoginInfo = DeepClone(state);
    return {
      ...MutableLoginInfo,
      IsLoading:true,
      AuthErrorMsg:null,
    }
  }),
  on(fromAuthStore.LoginFail,(state,action)=>{
    const MutableLoginInfo = DeepClone(state);
    return {
      ...MutableLoginInfo,
      userInfo:undefined,
      IsLoading:false,
      AuthErrorMsg:action.payload,
    }
  }),
  on(fromAuthStore.Logout,(state)=>{
    const MutableLoginInfo = DeepClone(state);
    return {...MutableLoginInfo, userInfo:undefined, IsLoading:false};
  }),
);


function DeepClone(object: any = {}) {
  if (Object.values(object).length === 0) {
    throw new Error("Object is Empty");
  }
  return JSON.parse(JSON.stringify({
    ...object
  }));
}

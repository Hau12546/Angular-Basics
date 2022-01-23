import * as ShopReducer from "../../shopping-list/shopping-store/shopping-reducer";
import * as AuthReducer from "../services/authen/auth-reducer";
import { ShoppingState } from "../ingredient.model";
import { ActionReducerMap, Action } from '@ngrx/store'

export interface AppState {
  Shopping:ShoppingState,
  Auth:AuthReducer.State
};

// export const appReducer: ActionReducerMap<AppState>={
//   Shopping:ShopReducer.ShoppingReducer,
//   Auth:AuthReducer.authReducer
// };

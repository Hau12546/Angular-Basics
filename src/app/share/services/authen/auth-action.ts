import {createAction, props} from '@ngrx/store'
import { AppState } from '../../store/app-reducer';
export const AuthAction = {
  LOG_IN:'[Auth]_LOG_IN',
  LOG_OUT:'[Auth]_LOG_OUT',
  LOGIN_START:'[Auth]_LOGIN_START',
  LOGIN_FAIL:'[Auth]_LOGIN_FAIL',
};


export const Login = createAction(AuthAction.LOG_IN,props<{payload:AppState["Auth"]["userInfo"]}>());
export const LoginStart = createAction(AuthAction.LOGIN_START,props<{payload:{email:String, password:String, returnSecureToken:Boolean}}>());
export const LoginFail = createAction(AuthAction.LOGIN_FAIL,props<{payload:string}>());
export const Logout = createAction(AuthAction.LOG_OUT);


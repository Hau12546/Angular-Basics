import {
  HttpClient, HttpErrorResponse
} from "@angular/common/http";
import {
  Actions,
  createEffect,
  Effect,
  ofType
} from "@ngrx/effects";
import {
  catchError,
  map,
  switchMap,
  tap,
} from "rxjs/operators";
import {
  AuthResponseData
} from "../../Login.model";
import {
  AuthAPI
} from "./AuthenAPI";
import * as fromAuthAction from './auth-action';
import {
  Observable,
  of
} from "rxjs";
import { User } from "../../user.model";
import { Injectable } from "@angular/core";
import { Action } from "rxjs/internal/scheduler/Action";
import { Router } from "@angular/router";

export interface SignIn {
  email: String,
    password: String
};

@Injectable({
  providedIn:'root'
})
export class AuthEffects {
  authLogin = createEffect(():Observable<any>=> this.action$.pipe(
      ofType(fromAuthAction.LoginStart),
      switchMap((value: any)=>{
        return this.http.post<any>(AuthAPI.signInAPI, {
          email: value.payload.email,
          password: value.payload.password,
          returnSecureToken: value.payload.returnSecureToken
        }).pipe(// create new observable
          map(response => {
          const tokenExpirationDate:Date =  new Date( new Date().getTime() + Number(response.expiresIn)*1000);
          const user = new User(response.email||'', response.localId||'', response.idToken||'', tokenExpirationDate);
          console.log(response);
            return fromAuthAction.Login({payload:{
              email:user['email'],
              userId:user['id'],
              token:user['_token'],
              expirationDate:user['_tokenExpirationDate']
            }})},
            catchError((errorRes):any=>{
              let ErrorMessage = 'Unknonwn Error happened';
              if (!errorRes.error || !errorRes.error.error.message) {
                return fromAuthAction.LoginFail({payload:ErrorMessage});
              }
              return fromAuthAction.LoginFail({payload:errorRes.error.error.message});
            }),
          ),)})));
      authSuccess = createEffect(():Observable<any>=>this.action$.pipe(
        ofType(fromAuthAction.Login),
        tap(()=>{
          this.router.navigate(['/']);
        })
      ));

      constructor(private action$: Actions, private http: HttpClient, private router:Router) {}
  }

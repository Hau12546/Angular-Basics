import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  throwError
} from 'rxjs';
import {
  catchError, tap
} from 'rxjs/operators';
import {
  AuthResponseData,
  LoginInfo
} from '../../Login.model';
import { User } from '../../user.model';
import {
  AuthAPI
} from './AuthenAPI';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  public UserObservable = new BehaviorSubject<User|any>({});
  constructor(private http: HttpClient, private router:Router) {}
  ExpirationEvent:any;
  SignUp(email: string = '', password: string = '') {
    const UserLoginInfo: LoginInfo = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    if (Object.values(UserLoginInfo).length > 0) {
      return this.http.post < AuthenticatorResponse > (AuthAPI.signUpAPI, UserLoginInfo).pipe(catchError(this.AuthErrorHandler));
    }
    throw new Error('LoginInfo is not enough');
  }

  AutoLogin(){
    let UserInfo  = JSON.parse(localStorage['UserInfo']||'{}');
    // console.log(UserInfo);
    if(Object.values(UserInfo).length==0) throw new Error('No userInfo found when login');
    UserInfo = new User(UserInfo.email||'', UserInfo.id||'', UserInfo._token||'', UserInfo._tokenExpirationDate);
    if(UserInfo.getToken()){
      this.UserObservable.next(UserInfo);
      this.AutoLogOut(new Date(UserInfo._tokenExpirationDate).getSeconds());
    };
    return this.UserObservable;
  }

  LogOut(){
    // this.UserObservable.next({});
    // this.router.navigate(['/authentication']);
    // // localStorage.removeItem('UserInfo');
    // if(JSON.parse(localStorage.getItem('UserInfo')||'{}')){
    //   clearInterval(this.ExpirationEvent);
    // }
    // this.ExpirationEvent = null;
  }

  AutoLogOut(expirationTime:number = 5000){
    this.ExpirationEvent = setTimeout(() => {
      this.LogOut();
    }, expirationTime*1000);
  }

  SignIn(email: string = '', password: string = '') {
    const UserLoginInfo: LoginInfo = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    // console.log(UserLoginInfo)
    if (Object.values(UserLoginInfo).length > 0) {
      return this.http.post<AuthResponseData>(AuthAPI.signInAPI, UserLoginInfo)
      .pipe(catchError(this.AuthErrorHandler),tap((response)=>{this.UserAuthHandler(response)}));
    };
    throw new Error('LoginInfo is not enough');
  }

  private UserAuthHandler(response:AuthResponseData){
    const tokenExpirationDate:Date =  new Date( new Date().getTime() + Number(response.expiresIn)*1000);
    const user = new User(response.email||'', response.localId||'', response.idToken||'', tokenExpirationDate);
    if(Object.values(user).length>0){
      console.log(user)
      this.UserObservable.next(user);
      localStorage.setItem('UserInfo',JSON.stringify(user));
    }
  }

  private AuthErrorHandler(errorRes: HttpErrorResponse) {
    let ErrorMessage = 'Unknonwn Error happened';
    if (!errorRes.error || !errorRes.error.error.message) {
      return throwError(ErrorMessage);
    }
    return throwError(errorRes.error.error.message);
  }

}

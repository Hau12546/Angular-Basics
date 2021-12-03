import { AuthResponseData } from './../../Login.model';
import { AuthenService } from 'src/app/share/services/authen/authen.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { exhaustMap, first, take } from 'rxjs/operators';
import { User } from '../../user.model';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authen:AuthenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authen.UserObservable.pipe(take(1),
    exhaustMap((user:User)=>{
      let ModifiedRequest:HttpRequest<any>;
      if(Object.values(user).length==0){
         ModifiedRequest = request.clone({params: new HttpParams().set('auth',JSON.parse(localStorage.getItem('UserInfo')||'{}')._token)} );
         return next.handle(ModifiedRequest);
      }
      ModifiedRequest = request.clone({params: new HttpParams().set('auth',user._token)} );
      return next.handle(ModifiedRequest);
    }));
  }
}

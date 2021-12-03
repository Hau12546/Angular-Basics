import { AuthenService } from './../../share/services/authen/authen.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, LoginInfo } from 'src/app/share/Login.model';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Route } from 'vue-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  @ViewChild('userInfo') UserInfo:NgForm | undefined;
  constructor(private  authen:AuthenService, private router:Router) { }
  IsLogin:boolean = false;
  Isloading:boolean = false;
  IsError:boolean = false;
  ErrorMessage:string = '';
  ngOnInit(): void {
  }

  SwitchStatus(){
    this.IsLogin = !this.IsLogin;
  }

  SetRegisteredInfo(){
    const RegisterdInfo:LoginInfo  =JSON.parse(localStorage.getItem('LoginInfo') ||'{}');
    // console.log( this.UserInfo)
    if(Object.values(RegisterdInfo).length>0){
      this.UserInfo?.form.setValue({email:RegisterdInfo.email, password:RegisterdInfo.password});
    };
  }

  onSubmit(){
    if(this.UserInfo?.valid){
      let email:string = this.UserInfo.value.email;
      let password:string = this.UserInfo.value.password;
      let ObserAuth:Observable<AuthResponseData>;
      const GetAuthResult = (ObserAuth:Observable<any>) =>{
        ObserAuth.subscribe((value:any)=>{

          let LoginInfo:LoginInfo = {
            email:value.email,
            password:password
          };
          localStorage.setItem('LoginInfo',JSON.stringify(LoginInfo));
          this.Isloading = false;
          this.IsError = false;
        },(error:any)=>{
          // console.log(error.error.error.message);
          this.ErrorMessage = error;
          this.Isloading = false;
          this.IsError = true;
        });
      };
      if(this.IsLogin)
      {GetAuthResult(this.authen.SignIn(email, password));
        this.router.navigate(['/recipe'])
      }
      this.Isloading = true;
      if(!this.IsLogin)
      {GetAuthResult(this.authen.SignUp(email, password));
      }

      return;
    }
    this.UserInfo?.form.reset();
    throw new Error('LoginInfo is worng');
  }

}

import { AuthenService } from './../../share/services/authen/authen.service';
import { Component, ComponentFactoryResolver, OnInit, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, LoginInfo } from 'src/app/share/Login.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponentComponent } from 'src/app/share/alert-component/alert-component.component';
import { PlaceHolderDirective } from 'src/app/share/place-holder-directive/place-holder.directive';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  @ViewChild('userInfo') UserInfo:NgForm | undefined;
  constructor(private  authen:AuthenService, private router:Router, private factory:ComponentFactoryResolver) { }
  IsLogin:boolean = false;
  Isloading:boolean = false;
  IsError:boolean = false;
  ErrorMessage:string = '';
  @ViewChild(PlaceHolderDirective) AlertHost!:PlaceHolderDirective|undefined;
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
        },
        (error:any)=>{
          this.AlertMessage(error);
          this.Isloading = false;
          this.IsError = true;
        }
        );
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

  HandleErrorModal(){
    // this.IsError = false;

  }

  private AlertMessage(message:string=''){
    const AlertComponentFactory = this.factory.resolveComponentFactory(AlertComponentComponent);
    const AlertUIRef = this.AlertHost?.viewRef
    AlertUIRef?.clear();
    let AlertMessage =  AlertUIRef?.createComponent(AlertComponentFactory);
    AlertMessage!.instance.Message = message; // 100% sure object always defined to solve possibly undefined
    AlertMessage!.instance.CloseModal().subscribe(()=>{
      AlertUIRef!.clear();
    })
  }

}

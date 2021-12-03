import { AuthResponseData } from 'src/app/share/Login.model';
import { AuthenService } from './../share/services/authen/authen.service';
import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { SaveOptions } from '../share/recipe.model';
import { DataStorageService } from '../share/services/data-storage-service/data-storage.service';
import { RecipeService } from '../share/services/recipe-services/recipe.service';
import { User } from '../share/user.model';
import { ignoreElements } from 'rxjs/operators';
import { Subscription } from 'rxjs';



class CommonAction {
  constructor() {

  }
  ExecuteTryCatch(Event: Function = () => {
    console.log('No event found')
  }) {
    try {
      Event();
    } catch (error) {
      alert(error);
    }
  }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CommonAction implements OnInit,OnDestroy {
  @ViewChild('RecipeLink') RecipeLink: ElementRef | undefined;
  @ViewChild('ShoppingLink') ShoppingLink: ElementRef | undefined;
  @Output('Emitter') Emitter: EventEmitter < string > = new EventEmitter();
  SubscriptionList:Subscription[] = []
  IsLogin:boolean = false;
  constructor(private recipeService:RecipeService, private dataService:DataStorageService, private authen:AuthenService) {
    super();
  }

  ngOnInit() {
    this.LogStateToggle();
  }


  NavigateToRecipe() {
    console.log(this.RecipeLink?.nativeElement.innerText);
    try {
      if (this.RecipeLink?.nativeElement.innerText.toString()) {
        this.Emitter.emit(this.RecipeLink?.nativeElement.innerText.toString());
        return;
      }
      throw new Error('No Recipe Link found');
    } catch (error) {
      alert(error);
    }
  }

  NavigateToShopping() {
    console.log(this.ShoppingLink?.nativeElement.innerText);
    try {
      if (this.ShoppingLink?.nativeElement.innerText.toString()) {
        this.Emitter.emit(this.ShoppingLink?.nativeElement.innerText.toString());
        return;
      }
      throw new Error('No Shopping Link found');
    } catch (error) {
      alert(error);
    }
  }

  SaveRecipe(){
    const Savechoice:SaveOptions  = {single:false, all:true}
    this.recipeService.SendSignalToSaveInDataBase(Savechoice);
  }


  FetchRecipe(){
    this.recipeService.SendSignalToSaveInDataBase({single:false, all:false},true);
  }

  AddSubscription(subscribe:Subscription){
    this.SubscriptionList.push(subscribe);
  }

  LogStateToggle(){
    const Subscription1 =  this.authen.UserObservable.subscribe((value:any)=>{
      if(Object.values(value).length>0) this.IsLogin = true;
      if(Object.values(value).length==0) this.IsLogin = false;
    });
    this.AddSubscription(Subscription1);
  }


  LoggingOut(){
    this.IsLogin = false;
    this.authen.LogOut();
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.SubscriptionList.forEach((subscribe:Subscription)=>{
      subscribe.unsubscribe();
    });
  }

}

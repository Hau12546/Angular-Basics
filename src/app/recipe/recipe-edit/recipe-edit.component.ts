import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/share/services/recipe-services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy {
  EditModeFlg:boolean = false;
  id:number = -1;
  SubscriptionList:Subscription[] = [];
  constructor(private recipeService:RecipeService, private router:Router, private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.GetIDFromParams();
  }

  GetIDFromParams(){
    const Subscription1 =  this.activeRoute.params.subscribe((recipeID:Params)=>{
      if(recipeID.id){
        this.id = recipeID.id;
        this.EditModeFlg = true;
        console.log(this.EditModeFlg);
        return;
      }
      this.EditModeFlg = false;
    });
    this.AddSubscribe(Subscription1);
  }

  AddSubscribe(subscribe:Subscription){
    this.SubscriptionList.push(subscribe);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.SubscriptionList.forEach((subscribe:Subscription)=>{
      subscribe.unsubscribe();
    })
  }

}

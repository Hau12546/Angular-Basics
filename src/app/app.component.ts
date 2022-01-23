import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthenService } from './share/services/authen/authen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'App-Course';
  RecipeInfoDisplayFlg:boolean = false;
  ShoppingInfoDisplayFlg:boolean = false;
  constructor(private authen:AuthenService, @Inject(PLATFORM_ID) private platformId:any){}
  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.authen.AutoLogin().subscribe((value:any)=>{
      console.log(value);
    });
    }
    this.RenderContent();

  }

  RenderContent(e:any=undefined){
    console.log(e);
    switch (e) {
      case 'Reipes':{
        this.RecipeInfoDisplayFlg = true;
        this.ShoppingInfoDisplayFlg = false;
        break;
      }
      case 'Shopping List':{
        this.RecipeInfoDisplayFlg = false;
        this.ShoppingInfoDisplayFlg = true;
        break;
      }
      default:{
        this.RecipeInfoDisplayFlg = true;
        this.ShoppingInfoDisplayFlg = false;
        break;
      }
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'App-Course';
  RecipeInfoDisplayFlg:boolean = false;
  ShoppingInfoDisplayFlg:boolean = false;
  ngOnInit() {
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

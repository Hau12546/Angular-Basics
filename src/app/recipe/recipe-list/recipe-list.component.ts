import {RecipeInfo} from '../../share/recipe.model';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  Recipes: Recipe[] = [
    new Recipe('pad kra pao',
    'Minced offcut stalks and skins bring body and flavour to many dishes, such as this pad kra pao',
    'https://i.guim.co.uk/img/media/1e1d7ce465772ce9454a7d8adbdfcb683ad367db/0_0_4992_3328/master/4992.jpg?width=1020&quality=85&auto=format&fit=max&s=22b143f1d34cb4983d5dc2dccc520c2a')
  ]
  @Output('Emitter') Emitter:EventEmitter<RecipeInfo> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  GetRecipeDetail(e:any){
    this.Emitter.emit(e);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/share/services/recipe-services/recipe.service';
import { RecipeInfo } from '../../../share/recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('RecipeData') RecipeData:RecipeInfo = {
    name:" pad kra pao",
    description:'Minced offcut stalks and skins bring body and flavour to many dishes, such as this pad kra pao',
    imagePath:'https://i.guim.co.uk/img/media/1e1d7ce465772ce9454a7d8adbdfcb683ad367db/0_0_4992_3328/master/4992.jpg?width=1020&quality=85&auto=format&fit=max&s=22b143f1d34cb4983d5dc2dccc520c2a'
  };
  @Output('Emitter') Emiiter:EventEmitter<RecipeInfo> = new EventEmitter();
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }

  GetRecipe(e:any){
    // console.log(e);
  }

  SendRecipeToDetail(){
    this.recipeService.SendRecipe(this.RecipeData);
  }

}


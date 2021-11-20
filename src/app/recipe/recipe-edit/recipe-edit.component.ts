import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/share/services/recipe-services/recipe.service';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeInfo } from 'src/app/share/recipe.model';
import { IngredientInfo } from 'src/app/share/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  EditModeFlg: boolean = false;
  id: number = -1;
  SubscriptionList: Subscription[] = [];
  RecipeForm: FormGroup = new FormGroup({});
  IngredientFormArray:any[] = [];
  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.InitialForm();
    this.GetIDFromParams();
  }

  InitialForm() {
    this.RecipeForm = new FormGroup({
      'RecipeName': new FormControl('Sheet-pan Gnochi', [Validators.required], []),
      'RecipeImage': new FormControl('https://assets.bonappetit.com/photos/60a4022a248102a01bcfa0b6/1:1/w_2560%2Cc_limit/0621-Sheet-Pan-Gnocchi.jpg',
        [Validators.required], []),
      'RecipeComment': new FormControl('', [], []),
      'RecipeIngredient': new FormArray([]),
    });
  };

  OnSaveRecipe() {
    const NewRecipe:RecipeInfo = {};
    NewRecipe.id = this.RecipeForm.get('RecipeName')?.value.length+1;
    NewRecipe.name = this.RecipeForm.get('RecipeName')?.value;
    NewRecipe.imagePath = this.RecipeForm.get('RecipeImage')?.value;
    NewRecipe.description = this.RecipeForm.get('RecipeComment')?.value;
    NewRecipe.IngredientList = [];
    this.RecipeForm.get('RecipeIngredient')?.value.forEach((element:IngredientInfo) => {
      NewRecipe.IngredientList?.push(element);
    });
    if(this.RecipeForm.valid){
      !this.EditModeFlg&& this.recipeService.AddRecipe(NewRecipe);
      this.EditModeFlg&&this.recipeService.UpdateRecipe(this.id, NewRecipe);
      this.ResetEditMode();
      this.router.navigate(['recipe']);
    }

  }

  GetIDFromParams() {
    const Subscription1 = this.activeRoute.params.subscribe((recipeID: Params) => {
      if (recipeID.id) {
        this.id = recipeID.id;
        this.EditModeFlg = true;
        try {
          const EditingRecipe = this.recipeService.GetSingleRecipe(this.id);
          this.SetRecipeInfo(EditingRecipe);
        } catch (error) {
          console.log(error);
        }
      }
    });
    this.AddSubscribe(Subscription1);
  };

  SetRecipeInfo(recipe: RecipeInfo = {}) {
    if (Object.values(recipe).length > 0) {
      this.RecipeForm.patchValue({
        'RecipeName': recipe.name,
        'RecipeImage': recipe.imagePath,
        'RecipeComment': recipe.description
      });
      this.SetRecipeIngredients(recipe);
      return;
    };
    throw new Error('406 Not Acceptable');
  };

  SetRecipeIngredients(recipe: RecipeInfo = {}){
    if(Object.values(recipe).length>0 )
    {
      console.log(this.RecipeForm.get('RecipeIngredient')?.value)
      recipe.IngredientList?.forEach((ingredient:IngredientInfo)=>{
        (<FormArray>this.RecipeForm.get('RecipeIngredient')).push(new FormGroup({
          'name': new FormControl(ingredient.name,[Validators.required]),
          'amount': new FormControl(ingredient.amount,[Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
        }));
      });
    }
  }
  CreateIngredient(){
    (<FormArray>this.RecipeForm.get('RecipeIngredient')).push(new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'amount': new FormControl('',[Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
    }));
  };

   GetIngredient() { // a getter!
    return (this.RecipeForm.get('RecipeIngredient') as FormArray).controls;
  }

  RemoveIngredient(index:number = -1){
    console.log(index)
    if(index<0) throw new Error('408 Request Timeout');
    (<FormArray>this.RecipeForm.get('RecipeIngredient')).removeAt(index);
  }

  ResetEditMode(){
    this.id = -1;
    this.EditModeFlg = false;
  }

  CancelRecipeCreation(){
    this.RecipeForm.reset();
    this.router.navigate(['/recipe']);
  }

  AddSubscribe(subscribe: Subscription) {
    this.SubscriptionList.push(subscribe);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.SubscriptionList.forEach((subscribe: Subscription) => {
      subscribe.unsubscribe();
    })
  }

}

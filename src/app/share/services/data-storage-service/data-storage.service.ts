import { Recipe } from './../../../recipe/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeInfo } from '../../recipe.model';
import { recipeAPI } from './recipe-api';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipe-services/recipe.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  ReipeList:RecipeInfo[] = [];
  constructor(private http:HttpClient, private recipeService:RecipeService) {
    this.FirstFetch();
   }


  FirstFetch(){
    return this.http.get<RecipeInfo[]>(recipeAPI.get).pipe(map((response)=>{
      const ModifiedList = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            ModifiedList.push({...response[key]});
          }
        }
        return ModifiedList;
    })).subscribe((value:RecipeInfo[])=>{
      this.recipeService.IntializeDataFromDB(value);
    })
  }

  SaveRecipe(recipe:RecipeInfo|RecipeInfo[] = {}){
    if(Object.values(recipe).length>0){
      this.http.put<RecipeInfo>(recipeAPI.post,recipe).subscribe(()=>{
        console.log('Data is sent');
      });
      return;
    };
    throw new Error('Data is not sent');
  }

  FetchRecipe(){
    return this.http.get<RecipeInfo[]>(recipeAPI.get).pipe(map((response)=>{
      const ModifiedList = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            ModifiedList.push({...response[key]});
          }
        }
        return ModifiedList;
    }));
  }



  DeleteRecipe(){
    this.http.delete(recipeAPI.delete).subscribe(()=>{
      console.log('Delete Done')
    })
  }

}

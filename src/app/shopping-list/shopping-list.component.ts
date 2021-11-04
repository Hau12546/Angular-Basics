import { Ingredients } from './../share/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  Ingredients:Ingredients[] =[
    new Ingredients('Apple',10),
    new Ingredients('Tomatoes',12)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

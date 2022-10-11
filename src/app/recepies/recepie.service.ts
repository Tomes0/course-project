import { Recepie } from "./recepie.model";
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecepieService{
  recepieSelected = new EventEmitter<Recepie>();

  private recepies: Recepie[] = [
    new Recepie('A Test Recepie',
    'Test Description',
    'https://www.sophisticatedgourmet.com/wp-content/uploads/2020/04/how-to-fry-an-egg-recipe-735x979.jpg',
    [
      new Ingredient('Meat',1),
      new Ingredient('French Fries',20)
    ]),
    new Recepie('A Test Other Recepie',
    'Test Description',
    'https://www.sophisticatedgourmet.com/wp-content/uploads/2020/04/how-to-fry-an-egg-recipe-735x979.jpg',
    [
      new Ingredient('Buns',2),
      new Ingredient('Meat',41)
    ])
  ];

  getRecepies() {
    return this.recepies.slice();
  }

  getRecepieById(id: number): Recepie{
    return this.recepies.slice()[id];
  }



  constructor(private shoppingListService: ShoppingListService){}
}

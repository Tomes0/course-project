import { Recepie } from "./recepie.model";
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from "rxjs";


@Injectable()
export class RecepieService{
  recepiesChanged = new Subject<Recepie[]>();

 /*  private recepies: Recepie[] = [
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
  ]; */
  private recepies: Recepie[] = [];

  getRecepies() {
    return this.recepies.slice();
  }

  getRecepieById(id: number): Recepie{
    return this.recepies.slice()[id];
  }

  addRecepie(recepie: Recepie){
    this.recepies.push(recepie);
    this.recepiesChanged.next(this.recepies.slice());
  }

  updateRecepie(index: number, recepie: Recepie){
    this.recepies[index] = recepie;
    this.recepiesChanged.next(this.recepies.slice());
  }

  deleteRecepie(index: number){
    this.recepies.splice(index, 1);
    this.recepiesChanged.next(this.recepies.slice());
  }

  setRecepies(recepies: Recepie[]){
    this.recepies = recepies;
    this.recepiesChanged.next(this.recepies.slice());
  }

  constructor(private shoppingListService: ShoppingListService){}
}

import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
  ingredientChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Cheese", 5),
    new Ingredient("Tomato", 10),
  ];

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredient(ingredient :Ingredient):void{
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients :Ingredient[]):void{
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}

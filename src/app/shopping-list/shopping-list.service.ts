import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
  ingredientChanged = new Subject<Ingredient[]>();
  statedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Cheese", 5),
    new Ingredient("Tomato", 10),
  ];

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index  ];
  }

  addIngredient(ingredient :Ingredient):void{
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients :Ingredient[]):void{
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  removeIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient
    this.ingredientChanged.next(this.ingredients.slice());

  }
}

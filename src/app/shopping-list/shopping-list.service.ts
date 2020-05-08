import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  //ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject<Ingredient[]>();
  itemIndex = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 10),
    new Ingredient("Pear", 15),
  ];
  constructor() {}

  addIngredient(add: Ingredient) {
    //console.log("new ingredient", add);
    this.ingredients.push(add);
    console.log(this.ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    // console.log("serv del", delIngredient);
    // const copyArr = this.ingredients.slice();
    // const newArr = copyArr.filter((i, ind, full) => delIngredient !== i);

    // console.log("in service delete", newArr);
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredients(inds: Ingredient[]) {
    this.ingredients.push(...inds);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}

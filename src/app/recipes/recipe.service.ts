import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  constructor() {}

  recipeChanged = new Subject<Recipe[]>();
  selectedRecipe = new Subject<Recipe>();

  private recipes: Recipe[] = [];
  //= [
  //   new Recipe(
  //     "Raagi Koozh",
  //     "Koozh is cool",
  //     "https://img-global.cpcdn.com/recipes/cddf6a2528fdb358/1200x630cq70/photo.jpg",
  //     [new Ingredient("Raagi", 1), new Ingredient("Water", 5)]
  //   ),
  //   new Recipe(
  //     "Dosai",
  //     "Crispy & Tasty",
  //     "https://files2.hungryforever.com/wp-content/uploads/2018/03/10102440/pexels-photo-221143.jpg",
  //     [new Ingredient("Urud", 1), new Ingredient("Rice", 5)]
  //   ),
  // ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    //console.log(index);
    console.log(this.recipes.splice(index, 1));
    //console.log(this.recipes);
    //console.log(this.recipes.slice());
    this.recipeChanged.next(this.recipes.slice());
  }
}

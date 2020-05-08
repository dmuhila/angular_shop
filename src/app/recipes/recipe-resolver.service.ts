import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root",
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipe = this.recipeService.getRecipes();
    if (recipe.length === 0) {
      return this.dataStorage.fetchRecipes();
    } else return recipe;
  }
}

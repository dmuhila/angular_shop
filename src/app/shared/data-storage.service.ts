import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put("https://recipe-course-c85f2.firebaseio.com/recipes.json", recipes)
      .subscribe((res) => console.log(res));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>("https://recipe-course-c85f2.firebaseio.com/recipes.json")
      .pipe(
        map((recipe) => {
          return recipe.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipe) => this.recipeService.setRecipes(recipe))
      );

    // .subscribe((recipe) => {
    //   this.recipeService.setRecipes(recipe);
    // });
  }
}

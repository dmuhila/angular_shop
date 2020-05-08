import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  // @Output() chosenRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        //console.log("in rlist", recipes);
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  // selectedRecipe(recipe: Recipe) {
  //   this.chosenRecipe.emit(recipe);
  // }
  handleClick() {
    //this.router.navigate(["/recipes", "new"]);
    this.router.navigate(["new"], { relativeTo: this.routes });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

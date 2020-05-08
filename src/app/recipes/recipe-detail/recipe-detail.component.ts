import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  index: number;
  constructor(
    private recipeService: RecipeService,
    private sls: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log("in details for id", params["id"]);
      this.index = +params["id"];
      this.recipe = this.recipeService.getRecipeById(this.index);
    });
  }

  add() {
    console.log("recipe in detail", this.recipe);
    console.log("slected ing to add", this.recipe.ingredients);
    this.sls.addIngredients(this.recipe.ingredients);
  }
  handleEdit() {
    //this.router.navigate(["edit"], { relativeTo: this.routes });
    this.router.navigate(["../", this.index, "edit"], {
      relativeTo: this.route,
    });
  }
  handleDelete() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(["../"], {
      relativeTo: this.route,
    });
    console.log(
      this.router.navigate(["../"], {
        relativeTo: this.route,
      })
    );
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  index: number;
  editMode = false;

  private shopListSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // this.httpClient
    //   .delete("/api/hello")
    //   .subscribe((res) => console.log("api", res));
    this.ingredients = this.shoppingListService.getIngredients();
    this.shopListSubscription = this.shoppingListService.ingredientChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
        console.log("in shop list", this.ingredients);
      }
    );
  }

  handleItem(i: number) {
    this.shoppingListService.itemIndex.next(i);
  }

  ngOnDestroy() {
    this.shopListSubscription.unsubscribe();
  }

  // handleAddIngredient(add: Ingredient) {
  //   console.log("new ingredient", add);
  //   this.shoppingListService.addIngredient(add);
  // }
}

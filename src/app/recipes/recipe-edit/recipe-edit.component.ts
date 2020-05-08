import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeSer: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param["id"];
      this.editmode = param["id"] != null; // if a id is thr, its true, then in editmode
      // console.log(this.editmode);
      // console.log(param["id"]);
      // console.log(this.id);
      this.initialisation(); //when new id is available(which indicates page reloaded) form must be reinitialised
    });
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    const recipe = this.recipeForm.value;
    if (this.editmode) {
      this.recipeSer.updateRecipe(this.id, recipe);
    } else this.recipeSer.addRecipe(recipe);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], {
      relativeTo: this.route,
    });
  }
  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onX(i: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(i);
    // new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   amount: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern(/^[1-9]+[0-9]*$/),
    //   ]),
    // })
    //);
  }

  private initialisation() {
    let recipeName = "";
    let recipeUrl = "";
    let recipeDesc = "";
    let recipeIngredients = new FormArray([]);

    if (this.editmode) {
      const recipe = this.recipeSer.getRecipeById(this.id);

      recipeName = recipe.name;
      recipeUrl = recipe.imagePath;
      recipeDesc = recipe.description;

      if (recipe["ingredients"]) {
        for (let ingredient of recipe["ingredients"]) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeUrl, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}

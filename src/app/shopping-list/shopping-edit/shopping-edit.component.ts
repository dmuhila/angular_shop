import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("nameInput", { static: true }) nameInput: ElementRef;
  // @ViewChild("amountInput", { static: true }) amountInput: ElementRef;

  @ViewChild("f", { static: true }) f: NgForm;

  ingredient: Ingredient;
  editMode = false;
  editIndex: number;
  editItem: Ingredient;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.itemIndex.subscribe(
      (index: number) => {
        this.editIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.f.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  handleSubmit(f: NgForm) {
    console.log(f);
    const value = f.value;
    var newIngredient = new Ingredient(value.name, value.amount);
    // with ViewChild
    // console.log(this.amountInput.nativeElement.value);
    // var newIngredient = new Ingredient(
    //   this.nameInput.nativeElement.value,
    //   this.amountInput.nativeElement.value
    // ); //or
    // this.ingredient = {
    //   name: this.nameInput.nativeElement.value,
    //   amount: this.amountInput.nativeElement.value,
    // };
    //console.log("ingredient in shopedit", this.ingredient);
    // console.log("ingredient in shopedit", newIngredient);

    // this.addIngredient.emit(newIngredient);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editIndex, newIngredient);
    } else this.shoppingListService.addIngredient(newIngredient);
    this.editMode = false;
    f.reset();
  }
  onDelete() {
    console.log(this.editItem, this.editIndex);
    this.shoppingListService.deleteIngredient(this.editIndex);
    // console.log(this.ingredient);
    // this.editMode = false;
    // this.f.reset();
    this.onClear();
  }
  onClear() {
    this.editMode = false;
    this.f.reset();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: RecipeStartComponent,
      },
      {
        path: "new",
        component: RecipeEditComponent,
      },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
  {
    path: "shoplist",
    component: ShoppingListComponent,
  },
  {
    path: "auth",
    component: AuthComponent,
  },
  // {
  //     path: '**',
  //     component: PageNotFoundComponent
  // }
];

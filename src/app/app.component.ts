import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  //choosen: string;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
  // selected(check) {
  //   console.log("inside selectRecipe", this.choosen);
  //   this.choosen = check;
  //   console.log("2nd inside selectRecipe", this.choosen);
  // }
}

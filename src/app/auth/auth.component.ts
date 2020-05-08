import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponse } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const pw = form.value.password;

    this.isLoading = true;
    let authObs: Observable<AuthResponse>;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, pw);
    } else {
      authObs = this.authService.signUp(email, pw);
    }
    authObs.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.route.navigate(["/recipes"]);
      },
      (errorMsg) => {
        console.log(errorMsg);
        this.error = errorMsg;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private route: Router) {}

  signUp(email: string, pw: string) {
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3dbuBXXYtgK4_AY-xo0AyMTwnSkAZWUk",
        { email: email, password: pw, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn //+ converts string to number
          )
        )
      );
  }

  login(email: string, pw: string) {
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3dbuBXXYtgK4_AY-xo0AyMTwnSkAZWUk",
        { email: email, password: pw, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      console.log("inside !user", userData);
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      //console.log(loadedUser);
      const reserveTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      //console.log(reserveTime);
      this.autoLogOut(reserveTime);
      this.user.next(loadedUser);
    }
  }

  logOut() {
    this.user.next(null);
    this.route.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationTime);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const eDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, eDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    //console.log(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(eRes: HttpErrorResponse) {
    let errorMsg = "An error occured";
    if (!eRes.error || !eRes.error.error) {
      return throwError(eRes);
    }
    switch (eRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMsg = "Email already exists";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "Email doesnot exists";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "Invalid password";
        break;
    }
    return throwError(errorMsg);
  }
}

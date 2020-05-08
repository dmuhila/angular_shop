import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // if (!user) {
        //   return next.handle(req);
        // }
        if (
          req.url === "https://recipe-course-c85f2.firebaseio.com/recipes.json"
        ) {
          const modifiedReq = req.clone({
            params: new HttpParams().set("auth", user.token),
          });
          return next.handle(modifiedReq);
        } else return next.handle(req);
      })
    );
  }
}
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { subscribeOn } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  subscription: Subscription;
  //@Output() select: EventEmitter<any> = new EventEmitter();
  //@Output() shopList: EventEmitter<any> = new EventEmitter();

  // handleSelect(check: string) {
  //   this.select.emit(check);
  // }
  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSave() {
    this.dataStorage.storeRecipes();
  }

  onFetch() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import {
  Directive,
  HostListener,
  ElementRef,
  HostBinding,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  constructor(private elRef: ElementRef) {}
  @HostBinding("class.open") isOpen: boolean = false;
  @HostListener("click") toggleOpen(eventData: Event) {
    //console.log(this.elRef.nativeElement);
    this.isOpen = !this.isOpen;
  }
}

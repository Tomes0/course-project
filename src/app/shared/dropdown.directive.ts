import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective{

  @HostBinding('class.open') toggle: boolean=false;
  @HostListener('click')onClick(){
    this.toggle =! this.toggle;
  }

  constructor() { }
}

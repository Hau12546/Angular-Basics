import {
  ThrowStmt
} from '@angular/compiler';
import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  DropdownOpen: string = 'dropdown-item';
  DropdownClosed: string = 'custom-display';
  constructor(private el: ElementRef, private render: Renderer2) {
    render.addClass(el.nativeElement, this.DropdownClosed);
    const DropdrownTarget = this.render.parentNode(this.el.nativeElement);
    this.ToggleDropdown(DropdrownTarget);
  }


    ToggleDropdown(el:any){
      this.render.listen(el.nativeElement,'click',()=>{
        if (typeof (this.el.nativeElement.getAttribute('class').match(this.DropdownClosed)) == 'object') {
          this.render.removeClass(this.el.nativeElement, this.DropdownClosed);
          this.render.addClass(this.el.nativeElement, this.DropdownOpen);
          return;
        }
        if (typeof (this.el.nativeElement.getAttribute('class').match(this.DropdownClosed)) != 'object') {
          this.render.removeClass(this.el.nativeElement, this.DropdownOpen);
          this.render.addClass(this.el.nativeElement, this.DropdownClosed);
          return;
        }
      })
    }

}

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[validateInput]'
})
export class ValidateInputDirective {

  @Input('regexFormat') regexFormat: RegExp = new RegExp(/^[0-9]{0,8}$/);

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event']) onKeyDown($event: KeyboardEvent) {
    let value = (this.el.nativeElement as HTMLInputElement).value;
    console.log(value);
    if (!value.match(this.regexFormat)) {
      console.log('does not match');
      $event.preventDefault();
      // (this.el.nativeElement as HTMLInputElement).value = 
    }
  }
}

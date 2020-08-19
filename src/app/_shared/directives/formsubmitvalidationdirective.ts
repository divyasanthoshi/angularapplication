import { Directive, Input, HostListener, OnInit, ElementRef, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appFormSubmitValidationMsg]'
})
export class FormSubmitValidationMsgDirective {

  @Input() validationControl: FormGroup;

  constructor(private host: ElementRef<HTMLFormElement>) {}
  // handle the nextbutton click event
  @HostListener('window:click', ['$event'])
  handleClickEvent(event) {
    if (event.target.id === 'nextbutton') {
    // marking the formfields touched on click next button
    this.markAsTouched(this.validationControl);
  }
}
// marking the formcontrols touched to trigger validation
 markAsTouched(formGroup: FormGroup): void {
    formGroup.markAsTouched();
    formGroup.updateValueAndValidity();
    (Object as any).values(formGroup.controls).forEach(
      control => {
        control.markAsTouched();
        control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
        if (control.controls) {
          this.markAsTouched(control);
        }
      });
  }

}

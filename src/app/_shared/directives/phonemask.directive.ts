import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subject } from 'rxjs';
import { createTextMaskInputElement } from 'text-mask-core';
import { NgControl } from '@angular/forms';


@Directive({
  selector: '[appPhoneMask]',
  providers: [IonInput],
})
export class PhoneMaskDirective implements OnInit {

  @Input('appPhoneMask')
  private mask: Array<any> = [];
  private onDestroy: Subject<void> = new Subject<void>();
  constructor(public ionInput: IonInput, public ngControl: NgControl) { }

  public ngOnInit() {
    this.configureInput();
  }

  // public ngOnDestroy() {
  //   this.onDestroy.next();
  // }
  public async configureInput() {

    const input = await this.ionInput.getInputElement();
    if (input.value !== '0') {
      const maskedInput = createTextMaskInputElement({
        inputElement: input,
        mask: this.mask,
        guide: false
      });
      // masking when event is not generated useful when loading
      maskedInput.update(input.value);
      this.ionInput.value = input.value;
      // masking when event is  generated
      this.ionInput
        .ionChange
        .pipe()
        .subscribe((event: CustomEvent) => {
          const { value } = event.detail;
          maskedInput.update(value);
          this.ionInput.value = input.value;
        });
    }
  }

}

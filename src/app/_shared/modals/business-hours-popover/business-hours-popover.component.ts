import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-business-hours-popover',
  templateUrl: './business-hours-popover.component.html',
  styleUrls: ['./business-hours-popover.component.scss'],
})
export class BusinessHoursPopoverComponent {
  constructor(private popoverCtrl: PopoverController,
              public navParams: NavParams) { }
  async onDismiss() {
    try {
      await this.popoverCtrl.dismiss();
    } catch (e) {
    }

  }

  addTime() {
    this.popoverCtrl.dismiss({ data: 'addButtonClick' });
  }
  removeTime() {
    this.popoverCtrl.dismiss({ data: 'removeButtonClick' });

  }
  copy() {
    this.popoverCtrl.dismiss({ data: 'copy' });
  }

  paste() {
    this.popoverCtrl.dismiss({ data: 'paste' });
  }
  clear() {
    this.popoverCtrl.dismiss({ data: 'clear' });
  }

  openAllDay() {
    this.popoverCtrl.dismiss({ data: 'openAllDay' });
  }

}

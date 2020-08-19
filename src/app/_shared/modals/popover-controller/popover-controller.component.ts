import { Component, AfterViewInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { linkDescription } from '../../../questionnaire/questionnaire.constant';
import { LinkDescription } from '../../../questionnaire/questionnaire-interface';

@Component({
    selector: 'app-modal',
    templateUrl: './popover-controller.component.html',
    styleUrls: ['./popover-controller.component.scss']
})

export class PopoverControllerComponent implements AfterViewInit {
    linkDescription: LinkDescription = linkDescription;
    constructor(private popoverCtrl: PopoverController, public navParams: NavParams) { }

    ngAfterViewInit() { }
    async onDismiss() {
        try {
            await this.popoverCtrl.dismiss();
        } catch (e) {
        }
    }
}

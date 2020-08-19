import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';


@Component({
  selector: 'app-application-ownership-toggle',
  templateUrl: './application-ownership-toggle.component.html',
  styleUrls: ['../../../../stylesheet/modules/ion-segment.scss' , './application-ownership-toggle.component.scss'],
})
export class ApplicationOwnershipToggleComponent implements OnInit {

  @Input() value: boolean | string;
  @Input() options: string [];
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  toggle_value(event) {
    this.onChange.emit(JSON.parse(event.target.value));
  }
}

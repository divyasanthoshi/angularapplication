import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { flyInLeftStaggerAnimation, flyUpAnimation, fadeOut} from 'src/app/_shared/animation/animation';
import { moveUpDownAnimation, moveUpAnimation } from '../application-animation';

@Component({
  selector: 'app-application-submit',
  templateUrl: './application-submit.component.html',
  styleUrls: ['./application-submit.component.scss'],
  animations: [flyInLeftStaggerAnimation, flyUpAnimation, fadeOut, moveUpDownAnimation, moveUpAnimation]
})
export class ApplicationSubmitComponent implements OnInit {
  @Input() isSubmitted: boolean;
  @Output()isAnimationdone = new EventEmitter<boolean>();

  constructor() {}



  ngOnInit() {}
  captureDoneEvent(event: any) {
    this.isAnimationdone.emit(true);
  }

}


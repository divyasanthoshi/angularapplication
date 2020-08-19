import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LookupChildrenRange } from '../questionnaire-interface';
import { slideInOut, fadeInOut } from 'src/app/_shared/animation/animation';

@Component({
  selector: 'app-questionnaire-children',
  templateUrl: './questionnaire-children.component.html',
  styleUrls: ['../../../stylesheet/modules/ion-segment.scss', './questionnaire-children.component.scss'],
  animations: [
    slideInOut,
    fadeInOut
  ],
})
export class  QuestionnaireChildrenComponent implements OnInit, OnChanges {

  public isShow = true;

  @Input() childrenRangeList: LookupChildrenRange[];
  @Input() childrenRange: number;
  @Output() selectChildrenRange = new EventEmitter<number>();

  currentRangeLabel: string;
  currentRangeValue = 1;

  // DO NOT REMOVE, this is used to generate repeatly icons in the page
  kidsArr = Array;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.childrenRange && changes.childrenRange.currentValue && this.childrenRangeList) {
      this.currentRangeValue = changes.childrenRange.currentValue;
      this.currentRangeLabel = this.childrenRangeList[this.currentRangeValue - 1].description;
    } else if (changes.childrenRangeList && this.childrenRangeList) {
      this.currentRangeLabel = this.childrenRangeList[0].description;
    }
  }
  rangeChange(event: any) {
    this.currentRangeValue = event;
    this.currentRangeLabel = this.childrenRangeList[this.currentRangeValue - 1].description;
    this.selectChildrenRange.emit(this.currentRangeValue);
  }
}

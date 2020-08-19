import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ListItem } from '../../Interfaces/utility';

export interface IOptionItem extends ListItem {
  iconName: string;
  selected: boolean;
}


@Component({
  selector: 'app-shared-iconoptions',
  templateUrl: './iconoptions.component.html',
  styleUrls: ['./iconoptions.component.scss'],
})

export class IconoptionsComponent implements OnInit {

  @Input() listItems: IOptionItem[];
  // @Input() selectedItem: IOptionItem;
  // can only use 12's factor
  @Input() elementPerline: number;
  // options: legend, small
  @Input() text = 'small';
  @Output() clickedItem = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
  }
  // this is to emit the value of the item that is clicked
  onClick(value: number) {
    this.clickedItem.emit(value);
  }

  // remove fa prefix for the names
  trimIconName(iconName: string) {
    const index = iconName.indexOf('fa');
    if (index > -1) {
      return iconName.slice(index + 2);
    }
    return '';
  }
}

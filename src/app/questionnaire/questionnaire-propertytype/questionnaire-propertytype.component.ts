import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IOptionItem } from 'src/app/_shared/components/iconoptions/iconoptions.component';
import { ProgramType2IconName } from '../questionnaire-enum';
import { LookupPropertyType } from '../questionnaire-interface';
import { slideInOut, fadeInOut } from '../../_shared/animation/animation';
import { PageLevelValidationService } from 'src/app/_shared/components/pagelevelvalidation/pagelevelvalidation.service';

@Component({
  selector: 'app-questionnaire-propertytype',
  templateUrl: './questionnaire-propertytype.component.html',
  styleUrls: ['./questionnaire-propertytype.component.scss'],
  animations: [
    slideInOut,
    fadeInOut
  ]
})
export class  QuestionnairePropertytypeComponent implements OnInit, OnChanges {

  public isShow = true;

  @Input() propertyTypes: LookupPropertyType[];
  @Input() selectedPropertyType: number;
  @Output() clickedItem = new EventEmitter<number>();
  optionItems: IOptionItem[] = [];
  selectedOption: number;
  valid = true;
  // used as a trigger for the animation for enter and leave

  constructor(private pageValidationService: PageLevelValidationService) { }

  // map the property type to option items for the icon
  ngOnInit() {
    // this.updateIconList()
  }

  // when the value of selected property type is changed, trigger the event to change the selected value
  ngOnChanges(changes: SimpleChanges): void {
    this.pageValidationService.resetPageLevelValidationMessage();
    if (changes.propertyTypes && this.propertyTypes) {
      this.updateIconList();
    }
    // remove the selected value previously and select the new value
    if (changes.selectedPropertyType && this.propertyTypes) {
      const selectedValue = changes.selectedPropertyType.currentValue as number;
      const selectedItemIndex = this.optionItems.findIndex(item => item.value === selectedValue);
      const preselectedItemIndex = this.optionItems.findIndex(item => item.selected === true);
      if (preselectedItemIndex > -1) {
          this.optionItems[preselectedItemIndex].selected = false;
      }
      if (selectedItemIndex > -1) {
        this.optionItems[selectedItemIndex].selected = true;
      }
    }
  }

  // update the list of the icons based on the list of the lookuppropertytype
  updateIconList() {
    this.optionItems = [];
    this.propertyTypes.map((lookupPropertyType) => {
      const item: IOptionItem = {
        text: lookupPropertyType.description,
        value: lookupPropertyType.propertyTypeId,
        iconName: ProgramType2IconName[lookupPropertyType.propertyTypeId],
        selected: false
      };
      this.optionItems.push(item);
    });
  }

  // this is to emit the value of the item that is clicked
  onClick(selectedValue: number) {
    this.selectedOption = selectedValue;
    this.clickedItem.emit(selectedValue);
  }

  // Page Level Validation
  validateForm() {
    if (this.selectedOption || this.selectedPropertyType) {
      this.valid = true;
      this.pageValidationService.resetPageLevelValidationMessage();
      return true;
    } else {
      this.valid = false;
      this.pageValidationService.setPageValidationMessage('property-type-select-error-msg');
      return false;
    }
  }
}

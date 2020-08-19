import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CascadeCheckbox } from 'src/app/_shared/Interfaces/utility';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'app-submitted-container',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  // data for checkboxes
  @Input() lookups = Array<CascadeCheckbox>();
  // title of the modal
  @Input() title: string;
  @Input() index: number;
  @Input() selectedLookups = Array<CascadeCheckbox>();
  // collect those as soon as checks/unchecks
  optionsChecked = Array<CascadeCheckbox>();
  selectionForm: FormGroup;
  singleSelectOptionsArray = [];
  singleSelect = false;

  get checkBoxesList(): FormArray {
    return this.selectionForm.get('checkBoxesList') as FormArray;
  }
  get radioBox(): FormControl {
    return this.selectionForm.get('radioBox') as FormControl;
  }



  constructor(private modalController: ModalController) {
    this.selectionForm = new FormGroup({
      checkBoxesList: new FormArray([]),
      // radioBox: new FormControl([]),

    });

  }


  ngOnInit() {
    // optionsChecked will have the changes made by the user
    this.optionsChecked = cloneDeep(this.lookups);


    // generating checkboxes as per the data
    if (this.checkBoxesList.length === 0) {
      this.optionsChecked.forEach(checkBoxItem => {
        if (checkBoxItem.isChecked === true && checkBoxItem.isSingleSelect === false) {
          this.checkBoxesList.push(new FormControl(true));
          this.selectedLookups.push(checkBoxItem);
        } else if (checkBoxItem.isChecked === false && checkBoxItem.isSingleSelect === false) {
          this.checkBoxesList.push(new FormControl(false));
        } else if (checkBoxItem.isSingleSelect === true) {
          this.singleSelectOptionsArray.push(checkBoxItem);
        }
      }
      );
    }
    // generating radioBox when singleSelectOptionsArray.length > 1
    if (this.singleSelectOptionsArray.length > 1) {
      this.selectionForm.addControl('radioBox', new FormControl());
      this.singleSelectOptionsArray.forEach(item => {
        if (item.isChecked === true) {
          this.radioBox.patchValue(item.value);
        }
      });
      this.singleSelect = true;
    }

    // subscribe to valueChanges of the checkBoxes
    this.checkBoxesList.valueChanges.subscribe(value => {

      for (let index = 0; index < this.checkBoxesList.length; index++) {
        const isOptionChecked = this.checkBoxesList.get(index.toString()).value;
        if (isOptionChecked) {
          this.optionsChecked[index].isChecked = true;
        } else {
          this.optionsChecked[index].isChecked = false;
        }
      }
      console.log(this.optionsChecked);
    });
    if (this.radioBox) {
      this.radioBox.valueChanges.subscribe(value => {
        if (value !== null) {
          const index = this.optionsChecked.findIndex(item => item.value === value);
          this.optionsChecked[index].isChecked = true;
          this.optionsChecked.forEach(item => {
            if (item.value !== value) {
              item.isChecked = false;
            }
          });
        }
      });
    }

  }

  // method to handle openModal click event
  openModal(index: number) {
    this.index = index;
    if (this.optionsChecked[index].childItems) {
      if (this.optionsChecked[index].isChecked === true || this.optionsChecked[index].isSingleSelect === true) {
      this.getModal(index);
      } else {
        this.optionsChecked[index].childItems.forEach(item => {
          item.isChecked = false ;
          item.childItems?.forEach(childItem => childItem.isChecked = false); });
      }
    }
  }

  async getModal(index: number) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        lookups: this.optionsChecked[index].childItems,
        title: this.lookups[index].text,
        index
      }

    });
    // to capture the values on dismissal of the modal and making changes in the childitems
    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.selectedLookups.length > 0) {
        const isOptionChecked = data.data.selectedLookups.findIndex(item => item.isChecked === true);
        if (this.checkBoxesList.length > 0 && isOptionChecked > -1) {
          this.checkBoxesList.get(this.index.toString()).setValue(true);
          this.optionsChecked[this.index.toString()].childItems = cloneDeep(data.data.selectedLookups);
          console.log(this.optionsChecked);
        } else if (this.checkBoxesList.length > 0 && isOptionChecked === -1) {
          this.checkBoxesList.get(this.index.toString()).setValue(false);
        } else if (this.radioBox && isOptionChecked === -1) {
          this.radioBox.setValue(null);
          this.optionsChecked[this.index.toString()].isChecked = false;
          this.optionsChecked[this.index.toString()].childItems = cloneDeep(data.data.selectedLookups);
          console.log(this.optionsChecked);
        } else if (this.radioBox) {
          this.optionsChecked[this.index.toString()].childItems = cloneDeep(data.data.selectedLookups);
          console.log(this.optionsChecked);


        }
      }
    });
    return await modal.present();
  }

  // method to handle the dimiss modal click event
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
      selectedLookups: this.optionsChecked,
      index: this.index
    });
  }
}



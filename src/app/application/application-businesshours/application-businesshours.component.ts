import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Validators, AbstractControl, FormControl, ValidationErrors, ValidatorFn, Form } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { BusinessHoursPopoverComponent } from 'src/app/_shared/modals/business-hours-popover/business-hours-popover.component';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ApplicationConstants } from '../application.constants';
import { Constant } from './../../_shared/constant';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { PageLevelValidationService } from 'src/app/_shared/components/pagelevelvalidation/pagelevelvalidation.service';



@Component({
  selector: 'app-application-businesshours',
  templateUrl: './application-businesshours.component.html',
  styleUrls: ['../../../stylesheet/modules/ion-segment.scss', './application-businesshours.component.scss'],
})
export class ApplicationBusinesshoursComponent implements OnInit {
  @Input() providerId: number;

  // business hours lookups
  @Input() set businessHoursLookup(months: any[]) {
    if (months && months.length) {
      months.forEach((month) => {
        // const checked = (this.businessDays)
        this.items.push({ ...month, checked: '0', businessDays: JSON.parse(JSON.stringify(this.businessDays)) });
        this.initializeForm();
        this.fillForm();
      });
    }
  }

  // intializing for the existing provider business hours
  @Input() set businessHoursRes(value: any) {
    if (value && this.items && this.items.length) {
      this.setBusinessHours(value);
    }
  }
  // emit create and update events
  @Output() create = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  dayOfWeekId: number[][] = [];
  timeSlotId: number[] = [];
  get itemsArray() {
    return this.businessHoursForm.controls.items as FormArray;
  }
  weekDaysIds = ApplicationConstants.weekDaysIds;
  weekDaysNames = ApplicationConstants.weekDaysNames;
  openDuringYear = ApplicationConstants.openDuringYear;
  value = false;
  copy;
  businessHoursForm: FormGroup;
  businessDays = [
    { dayOfWeekId: 2, dayOfWeek: 'Monday', timeSlot: [{}] },
    { dayOfWeekId: 3, dayOfWeek: 'Tuesday', timeSlot: [{}] },
    { dayOfWeekId: 4, dayOfWeek: 'Wednesday', timeSlot: [{}] },
    { dayOfWeekId: 5, dayOfWeek: 'Thursday', timeSlot: [{}] },
    { dayOfWeekId: 6, dayOfWeek: 'Friday', timeSlot: [{}] },
    { dayOfWeekId: 7, dayOfWeek: 'Saturday', timeSlot: [{}] },
    { dayOfWeekId: 1, dayOfWeek: 'Sunday', timeSlot: [{}] }
  ];
  items = [];

  get services() {
    return this.businessHoursForm.controls.items as FormArray;
  }
  constructor(
    private pageValidationService: PageLevelValidationService,
    public popoverController: PopoverController,
    public alertController: AlertController,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.fillForm();
  }

  // initialize the form group
  initializeForm() {
    this.businessHoursForm = this.fb.group({
      providerId: [],
      items: this.fb.array([]),
    });
  }

  fillForm() {
    if (!this.businessHoursForm) {
      return;
    }
    if (this.items && this.items.length) {
      this.items.forEach(item => this.itemsArray.push(this.initializeMonthsOfOperation(item)));
    }
  }

  initializeMonthsOfOperation(item?) {
    return this.fb.group({
      operatingMonth: [item && item.monthsOfOperationId ? item.monthsOfOperationId : ''],
      checked: [item && item.checked ? '1' : '0'],
      businessDays: item && item.businessDays ? this.initializeBusinessDays(item.businessDays) : this.initializeBusinessDays(this.businessDays),
    });
  }

  initializeBusinessDays(businessDays) {
    const businessDaysArray = this.fb.array([]);
    if (businessDays && businessDays.length) {
      businessDays.forEach(businessDay => businessDaysArray.push(this.initializeBusinessDaysGroup(businessDay)));
    }
    return businessDaysArray;
  }

  initializeBusinessDaysGroup(businessDay?) {
    return this.fb.group({
      dayOfWeekId: [businessDay && businessDay.dayOfWeekId ? businessDay.dayOfWeekId : ''],
      dayOfWeek: [businessDay && businessDay.dayOfWeekId ? this.weekDaysNames[businessDay.dayOfWeekId] : ''],
      timeSlot: this.generateTimeSlotArray(businessDay.timeSlot)
    });
  }

  generateTimeSlotArray(timeSlot): FormArray {
    if (timeSlot && timeSlot.length) {
      const formArray = this.fb.array([], { validators: this.customTimeSlotsArrayValidator });
      timeSlot.forEach(timeSlotItem => {
        const group: FormGroup = this.initializeTimeSlotGroup(timeSlotItem);
        formArray.push(group);
      });
      return formArray;
    }
    return this.fb.array([]);
  }

  initializeTimeSlotGroup(timeSlotItem?) {
    return this.fb.group({
      timeOpen: [timeSlotItem ? timeSlotItem.timeOpen : ''],
      timeClose: [timeSlotItem ? timeSlotItem.timeClose : ''],
    }, { validators: [this.comparisonValidator] });
  }


  // set the value of business hours
  setBusinessHours(value) {
    if (value.monthsOfOperation && value.monthsOfOperation.length && this.items && this.items.length) {
      this.items.forEach(item => {
        const matchedItem = value.monthsOfOperation.find(month => item.monthsOfOperationId === month.monthsOfOperationId);
        if (matchedItem && matchedItem.businessDays && matchedItem.businessDays.length) {
          item.checked = true;
          item.businessDays.forEach(businessDay => {
            const matchedBusinessDay = matchedItem.businessDays.find(businessday => businessday.dayOfWeekId === businessDay.dayOfWeekId);
            if (matchedBusinessDay && matchedBusinessDay.timeSlot && matchedBusinessDay.timeSlot.length) {
              businessDay.timeSlot = matchedBusinessDay.timeSlot;
            } else {
              businessDay.timeSlot = [];
            }
          });
          //
          // if(item.monthsOfOperationId == )
        } else {
          item.checked = false;
        }
      });
    }
    this.initializeForm();
    this.fillForm();
  }

  // popover controller
  async expand(event, timeSlotArray: FormArray, itemControl?: FormGroup, index?: number, group?: FormGroup) {
    const popover = await this.popoverController.create({
      component: BusinessHoursPopoverComponent,
      componentProps: {
        length: timeSlotArray.controls.length,
        index,
        copyEnable: (group && group.controls && group.controls.timeOpen.value && group.controls.timeClose.value),
        pasteEnable: this.copy,
        clearEnable: (group && group.controls && (group.controls.timeOpen.value || group.controls.timeClose.value))
      },
      showBackdrop: true,
      event,
      translucent: true,
    });
    popover.onDidDismiss().then(
      (data: any) => {
        if (data && data.data && data.data.data) {
          if (data.data.data === 'addButtonClick') {
            timeSlotArray.push(this.initializeTimeSlotGroup());
          } else if (data.data.data === 'removeButtonClick') {
            if (index !== undefined) {
              timeSlotArray.removeAt(index);
            }
          } else if (data.data.data === 'copy') {
            if (group) {
              this.copy = { timeOpen: group ? group.controls.timeOpen.value : null, to: group ? group.controls.timeClose.value : null };
            }
          } else if (data.data.data === 'paste') {
            if (group) {
              group.controls.timeOpen.setValue(this.copy.timeOpen);
              group.controls.timeClose.setValue(this.copy.to);
            }
          } else if (data.data.data === 'clear') {
            if (group) {
              group.controls.timeOpen.reset();
              group.controls.timeClose.reset();
            }
          } else if (data.data.data === 'openAllDay') {
            this.presentAlert(itemControl);
          }
          this.cdr.detectChanges();
        }
      });
    await popover.present();
  }

  // alert controller
  async presentAlert(itemControl: FormGroup) {
    const alert = await this.alertController.create({
      header: 'Replace Existing TimeSlots ?',
      message: ' This will replace existing timeslots with from 12 AM till 11:59 PM for all days of the week. Are you Sure?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Replace',
        handler: () => {
          this.replaceBusinessHours(itemControl);
        }
      }]
    });

    await alert.present();
  }

  // replace the value in time slots when open all day
  public replaceBusinessHours(itemControl: FormGroup) {
    const fromDate = new Date();
    fromDate.setHours(0, 0, 0);
    const toDate = new Date();
    toDate.setHours(23, 59, 0);

    (itemControl.controls.businessDays as FormArray).controls.forEach((businessDay: FormGroup) => {
      const control = businessDay.controls.timeSlot as FormArray;
      if (control && control.controls && control.controls.length) {
        if (control && control.controls && control.controls[0] as FormGroup) {
          (control.controls[0] as FormGroup).controls.timeOpen.patchValue(fromDate.toLocaleString());
          (control.controls[0] as FormGroup).controls.timeClose.patchValue(toDate.toLocaleString());
        }
        if (control && control.controls && control.controls[1] as FormGroup) {
          control.removeAt(1);
        }
      } else {
        control.push(this.initializeTimeSlotGroup());
        (control.controls[0] as FormGroup).controls.timeOpen.reset();
        (control.controls[0] as FormGroup).controls.timeOpen.patchValue(fromDate.toLocaleString());
        (control.controls[0] as FormGroup).controls.timeClose.reset();
        (control.controls[0] as FormGroup).controls.timeClose.patchValue(toDate.toLocaleString());
      }
    });
  }
  //  Validation of form based on business logic
  public validateForm() {
    if (this.businessHoursForm) {
      if (this.businessHoursForm.controls.items && (this.businessHoursForm.controls.items as FormArray).controls && (this.businessHoursForm.controls.items as FormArray).controls.length) {
        const itemsArray = (this.businessHoursForm.controls.items as FormArray).controls;
        itemsArray.forEach((item: FormGroup) => {
          if (item.controls.businessDays && (item.controls.businessDays as FormArray).controls && (item.controls.businessDays as FormArray).controls.length) {
            const businessDaysArray = (item.controls.businessDays as FormArray).controls;
            businessDaysArray.forEach((businessDay: FormGroup) => {
              if (businessDay.controls.timeSlot && (businessDay.controls.timeSlot as FormArray).controls && (businessDay.controls.timeSlot as FormArray).controls.length) {
                const timeSlotArray = (businessDay.controls.timeSlot as FormArray).controls;
                timeSlotArray.forEach((timeSlot: FormGroup) => {
                  if (timeSlot.controls.timeOpen.value && !timeSlot.controls.timeClose.value) {
                    timeSlot.controls.timeClose.setValidators(Validators.required);
                    timeSlot.controls.timeClose.setErrors({ required: true });
                    return false;
                  }
                  if (timeSlot.controls.timeClose.value && !timeSlot.controls.timeOpen.value) {
                    timeSlot.controls.timeOpen.setValidators(Validators.required);
                    timeSlot.controls.timeOpen.setErrors({ required: true });
                    return false;
                  }
                });
              }
            });
          }
        });
      }
      if (this.businessHoursForm.status === 'VALID') {
        const businessHours = this.modifyBusinessHours(this.businessHoursForm.value);
        if (!businessHours.monthsOfOperation.length) {
          this.pageValidationService.setPageValidationMessage('timeslots-required-msg');
          return false;
        } else {
          this.pageValidationService.resetPageLevelValidationMessage();
          if (businessHours.monthsOfOperation && businessHours.monthsOfOperation[0].businessDays.length > 1) {
            this.update.emit(businessHours);
          } else {
            this.create.emit(businessHours);
          }
          return true;
        }
      }
    }
  }

  private modifyBusinessHours(value) {
    if (value) {
      const monthsOfOperation = [];
      value.items.forEach(item => {
        let filteredBusinessDays;
        if (item.businessDays && item.businessDays.length) {
          filteredBusinessDays = item.businessDays.filter(businessDay => businessDay.timeSlot && businessDay.timeSlot.length && (businessDay.timeSlot[0].timeOpen || businessDay.timeSlot[0].timeClose));
        }
        if (filteredBusinessDays.length) {
          monthsOfOperation.push({
            monthsOfOperationId: item.operatingMonth,
            monthsOfOperation: this.openDuringYear[item.operatingMonth],
            businessDays: [...filteredBusinessDays]
          });
        }
      });
      return {
        providerId: this.providerId,
        monthsOfOperation
      };
    }
  }

  isContainsErrorIndex(value: number) {
    if (this.dayOfWeekId && this.dayOfWeekId.length) {
      const matchedDay = this.dayOfWeekId.find((day: number[]) => day[0] === value);
      if (matchedDay) {
        return matchedDay[1];
      }
    }
  }

  // validations for time slots
  public customTimeSlotsArrayValidator(array: FormArray): ValidatorFn {
    if (array.controls && array.controls[0] && (array.controls[0] as FormGroup).controls.timeClose && array.controls[1] && (array.controls[1] as FormGroup).controls.timeOpen) {
      const timeClose = (array.controls[0] as FormGroup).controls.timeClose;
      const timeOpen = (array.controls[1] as FormGroup).controls.timeOpen;
      if (timeOpen && timeOpen.value && timeClose && timeClose.value) {
        const timeOpenValue: number = new Date(timeOpen.value).getHours() + new Date(timeOpen.value).getMinutes();
        const timeCloseValue: number = new Date(timeClose.value).getHours() + new Date(timeClose.value).getMinutes();
        if ((timeOpenValue < timeCloseValue) || (timeOpenValue === timeCloseValue)) {
          timeOpen.setErrors({ invalid: true });
        } else {
          timeOpen.setErrors(null);
        }
        return;
      }
    }
  }

  public comparisonValidator(group: FormGroup): ValidatorFn {
    const timeOpen = group.controls.timeOpen;
    const timeClose = group.controls.timeClose;
    if (timeOpen && timeOpen.value && timeClose && timeClose.value) {
      const timeOpenValue = new Date(timeOpen.value).getHours() + new Date(timeOpen.value).getMinutes();
      const timeCloseValue = new Date(timeClose.value).getHours() + new Date(timeClose.value).getMinutes();
      // if ((timeOpenValue > timeCloseValue) || (timeOpenValue === timeCloseValue)) {
      const dateValid  = Date.parse(timeOpen.value) < Date.parse(timeClose.value);
      if (!dateValid) {
        timeClose.setErrors({ invalid: true });
      } else {
        timeClose.setErrors(null);
      }
      return;
    }
  }

  public groupRequiredValidator(group: FormGroup): ValidatorFn {
    const timeOpen = group.controls.timeOpen;
    const timeClose = group.controls.timeClose;
    if (timeOpen && timeOpen.value && timeClose && !timeClose.value) {
      timeClose.setErrors({ required: true });
    } else if (timeOpen && !timeOpen.value && timeClose && timeClose.value) {
      timeOpen.setErrors({ required: true });
    } else {
      timeOpen.setErrors(null);
      timeClose.setErrors(null);
    }
    return;
  }
}


import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Ownership, Personnel, Provider, ApplicationLookups, BusinessHours, BusinessDays, Services } from '../application-interface';
import { ApplicationConstants } from '../application.constants';
import { OrganizationType, PersonTitleId } from 'src/app/_shared/enum';
import _ from 'lodash';

@Component({
  selector: 'app-application-summary',
  templateUrl: './application-summary.component.html',
  styleUrls: ['../../../stylesheet/modules/review-form.scss', './application-summary.component.scss'],
})
export class ApplicationSummaryComponent implements OnInit, OnChanges {
  ownershipTypeTags = ApplicationConstants.ownershipTypeTags;
  _people: Personnel[];
  @Input() providerProfile: Provider;
  businessHoursData: BusinessHours;
  selectedServices: number[] = [];
  @Input() set businessHours(value: any) {
    if (value) {
      this.businessHoursData = JSON.parse(JSON.stringify(value));
      if (this.businessHoursData.monthsOfOperation && this.businessHoursData.monthsOfOperation.length) {
        this.businessHoursData.monthsOfOperation.forEach(monthOprt => {
          // for Weekday which closed and is not received from API
          this.businessDays.forEach((dayweek: any) => {
            const weekFound = monthOprt.businessDays.find(day => day.dayOfWeekId === dayweek.dayOfWeekId);
            if (!weekFound) {
              monthOprt.businessDays.push(dayweek);
            }
          });
          monthOprt.businessDays.sort((a, b) => (a.dayOfWeekId > b.dayOfWeekId) ? 1 : ((b.dayOfWeekId > a.dayOfWeekId) ? -1 : 0));
        });
        const monthOperIds = Object.keys(this.openDuringYear);
        monthOperIds.forEach((operationId: any) => {
          operationId = Number(operationId);
          const idExist = this.businessHoursData.monthsOfOperation.find(item => Number(item.monthsOfOperationId) === Number(operationId));
          if (!idExist) {
            this.businessHoursData.monthsOfOperation.push({
              businessDays: [],
              monthsOfOperationId: Number(operationId),
              monthsOfOperation: this.openDuringYear[operationId]
            });
          }
        });
      }
    }
  }
  @Input() services: Services;
  @Input() set people(value: Personnel[]) {
    this.isOwnerPresent = value && value.length ?
      value.some(item => item.personTitles.some(persontitle =>
        persontitle.personTitleId === PersonTitleId.Owner)) : false;
    this._people = value;
    this.ownersList = this.filterOwnersList(this._people);
  }
  @Input() ownership: Ownership;
  @Input() lookup: ApplicationLookups;
  @Output() personnelRedirect = new EventEmitter<number>();
  ownersList: Personnel[];
  isOwnerPresent: boolean;
  providerLink = ApplicationConstants.url.page.providerprofile;
  businessHoursLink = ApplicationConstants.url.page.businessHours;
  servicesLink = ApplicationConstants.url.page.services;
  peopleLink = ApplicationConstants.url.page.people;
  ownershipLink = ApplicationConstants.url.page.ownership;
  personnelLink = ApplicationConstants.url.page.personnelProfile;
  ownershipType: string;
  // not received from API, maintained in ApplicationConstants
  openDuringYear = ApplicationConstants.openDuringYear;
  businessDays = [
    { dayOfWeekId: 2, dayOfWeek: 'Monday', timeSlot: [] },
    { dayOfWeekId: 3, dayOfWeek: 'Tuesday', timeSlot: [] },
    { dayOfWeekId: 4, dayOfWeek: 'Wednesday', timeSlot: [] },
    { dayOfWeekId: 5, dayOfWeek: 'Thursday', timeSlot: [] },
    { dayOfWeekId: 6, dayOfWeek: 'Friday', timeSlot: [] },
    { dayOfWeekId: 7, dayOfWeek: 'Saturday', timeSlot: [] },
    { dayOfWeekId: 1, dayOfWeek: 'Sunday', timeSlot: [] }
  ];
  constructor() { }

  ngOnChanges() {
    if (this.services.serviceList.length > 0) {
    this.services.serviceList.forEach( service => {
    this.selectedServices.push(service.serviceId);
    });
    }
  }

  ngOnInit() {
    if (this.ownership && this.ownership.ownershipTypeId) {
      this.ownershipType = OrganizationType[this.ownership.ownershipTypeId];
    }

  }

  editPersonnel(personId: number) {
    if (personId) {
      this.personnelRedirect.emit(personId);
    }
  }


  // isOwner(personnel: Personnel): boolean {
  //   return !(personnel.personTitles && personnel.personTitles.length) ? false :
  //     personnel.personTitles.some(persontitle => persontitle.personTitleId === PersonTitleId.Owner);
  // }

  filterOwnersList(people: Personnel[]): Personnel[] {
    if (people && people.length) {
      return people.filter(personnel => personnel.personTitles.some(persontitle => persontitle.personTitleId === PersonTitleId.Owner));
    }
  }
}

import { Component, OnInit, Input, AfterViewChecked, OnChanges, EventEmitter, Output } from '@angular/core';
import { LookupServiceType, ServiceList, Services } from '../application-interface';
import { ApplicationConstants } from '../application.constants';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { PageLevelValidationService } from 'src/app/_shared/components/pagelevelvalidation/pagelevelvalidation.service';



@Component({
  selector: 'app-application-services',
  templateUrl: 'application-services.component.html',
  styleUrls: ['./application-services.component.scss'],
})
export class ApplicationServicesComponent implements OnChanges {
  // load the serviceLookups
  @Input() services: Services;
  @Input() servicesLookups: LookupServiceType[];
  @Input() providerId: number;

  // emit create and update events
  @Output() public create: EventEmitter<Services> = new EventEmitter<Services>();
  @Output() public update: EventEmitter<Services> = new EventEmitter<Services>();

  transportServiceId = ApplicationConstants.serviceDetails[9].serviceId;
  serviceDetails = ApplicationConstants.serviceDetails;

  serviceList: ServiceList[] = [];
  serviceListInitialized = false;
  servicesForm: FormGroup;
  showMessage = false;
  serviceFormvalue: Services = { providerId: 0, serviceList: [] };

  // getter for services FormArray
  get servicesFormArray(): FormArray {
    return this.servicesForm.get('services') as FormArray;
  }

  constructor(public pageValidationService: PageLevelValidationService) {
    this.servicesForm = new FormGroup({
      services: new FormArray([]),
    });
  }

  ngOnChanges() {
    // assigning the providerId on component initialization
    this.serviceFormvalue.providerId = this.providerId;
    // for eachLookup generating the object of interface type ServiceList
    if (this.servicesLookups && this.serviceList.length === 0) {
      this.servicesLookups.forEach(serviceLookup => {
        this.serviceList.push({
          serviceId: serviceLookup.serviceId,
          title: serviceLookup.description,
          description: this.getServiceDescription(serviceLookup.serviceId),
          isChecked: false,
          imagePath: this.getImagePath(serviceLookup.serviceId),
        });

      });
    }
    // to preselect the services on load
    if (this.services.serviceList.length > 0 && this.serviceList.length > 0 && this.servicesForm && this.servicesFormArray.length > 0) {
      this.services.serviceList.forEach(service => {
        const index = this.serviceList.findIndex(item => item.serviceId === service.serviceId);
        if (index >= 0) {
          this.serviceList[index].isChecked = true;
          this.servicesFormArray.controls[index].patchValue(true);
          // this.serviceFormvalue.serviceList.push({ serviceId: service.serviceId });
        }
      });
    }
    // for Each entry in serviceList generating a form control
    if (this.serviceList.length > 0 && this.serviceListInitialized === false) {
      this.serviceListInitialized = true;
      this.serviceList.forEach(service => {
        if (service.isChecked === false) {
          this.servicesFormArray.push(new FormControl(false));
        } else {
          this.servicesFormArray.push(new FormControl(true));
        }
      });
    }



  }

  // getServiceDescription
  getServiceDescription(serviceId: number): string {
    const index = ApplicationConstants.serviceDetails.findIndex(service => service.serviceId === serviceId);
    return ApplicationConstants.serviceDetails[index].description;
  }
  // getImagePath
  getImagePath(serviceId: number): string {
    const index = ApplicationConstants.serviceDetails.findIndex(service => service.serviceId === serviceId);
    return ApplicationConstants.serviceDetails[index].imagePath;
  }

  // onIonChangeevent updating the entries of the
  ChangeEvent(event: any) {
    const player = document.querySelectorAll('lottie-player');
    const index = Number(event.target.name);
    if (event.detail.checked === true) {
      player[index].play();
      this.serviceFormvalue.serviceList.push({ serviceId: event.detail.value });
    } else {
      player[index].stop();
      this.serviceFormvalue.serviceList.forEach(service => {
        if (service.serviceId === event.target.value) {
          this.serviceFormvalue.serviceList = this.serviceFormvalue.serviceList.filter(serv => serv.serviceId !== event.target.value);
        }
      }
      );
    }
  }

  servicesCrud() {
    if (this.services && this.services.serviceList.length > 0) {
      this.update.emit(this.serviceFormvalue);
    } else {
      this.create.emit(this.serviceFormvalue);
    }
  }

}

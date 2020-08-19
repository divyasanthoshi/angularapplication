import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ValidationMsgService } from '../../validations/validation.service';

export interface IPageLevelValidation {
    canShowErrorMessage: boolean;
    errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})

export class PageLevelValidationService {

    private pageLevelValidationDetail = new BehaviorSubject<IPageLevelValidation>({
        canShowErrorMessage: false,
        errorMessage: '',
    });
  constructor(private validationMsgService: ValidationMsgService) { }

  getPageValidationMessage() {
      return this.pageLevelValidationDetail.asObservable();
  }

  setPageValidationMessage(errorMessageId: string) {
    this.pageLevelValidationDetail.next({canShowErrorMessage: true,
        errorMessage: this.validationMsgService.getValidationMsg(errorMessageId)});
  }

  resetPageLevelValidationMessage() {
      this.pageLevelValidationDetail.next({canShowErrorMessage: false,
        errorMessage: ''});
  }
}

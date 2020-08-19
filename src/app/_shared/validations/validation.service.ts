import { Injectable } from '@angular/core';
import {Constant} from '../constant';

@Injectable({providedIn: 'root'})
export class ValidationMsgService {
    errorMessages = Constant.errorMessages;

    public getValidationMsg(validationId: string): string {
        return this.errorMessages[validationId];
    }
}

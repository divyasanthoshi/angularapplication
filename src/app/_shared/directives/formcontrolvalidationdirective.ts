import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationMsgService } from '../validations/validation.service';

@Directive({
    selector: '[appFormControlValidationMsg]'
})
export class FormControlValidationMsgDirective implements OnInit, OnDestroy {
    constructor(
        private elRef: ElementRef,
        private control: NgControl,
        private validationMsgService: ValidationMsgService
    ) { }

    @Input() validationMsgId: string;
    @Input() optional: boolean;
    errorSpanId = '';
    statusChangeSubscription: Subscription;

    ngOnInit(): void {
        this.errorSpanId = this.validationMsgId + new Date() + '-error-msg';

        //  we will be subscribing to the controls status change in the directive
        //  which improves the reusability across different templates
        this.statusChangeSubscription = this.control.statusChanges.subscribe(
            (status) => {
                if (status === 'INVALID') {
                    this.showError();
                } else {
                    this.removeError();
                }
            }
        );
    }
    // unsubscribing to statusChange onDestroy
    ngOnDestroy(): void {
        this.statusChangeSubscription.unsubscribe();
    }
    private showError() {
        this.removeError();
        const valErrors: ValidationErrors = this.control.errors;
        const firstKey = Object.keys(valErrors)[0];
        const errorMsgKey = this.validationMsgId + '-' + firstKey + '-msg';
        const errorMsg = this.validationMsgService.getValidationMsg(errorMsgKey);
        // constructing error message and placing it in template */
        const errMsg = document.createElement('span');
        errMsg.style.color = '#B22222';
        errMsg.id = `${this.errorSpanId}`;
        errMsg.textContent = errorMsg;

        const errIcon = document.createElement('ion-icon');
        errIcon.style.color = '#B22222';
        errIcon.id = `icon${this.errorSpanId}`;
        errIcon.name = 'alert-circle';
        errIcon.style.position = 'absolute';
        errIcon.style.right = '-2px';
        errIcon.style.fontSize = '1.3em';
        const errSpan = '<span style="color: #B22222; font-size:0.85em; display:block; padding-left:15px; padding-top:4px;" id="' + this.errorSpanId + '">' + errorMsg + '</span>';

        this.elRef.nativeElement.append(errIcon);
        this.elRef.nativeElement.parentElement.insertAdjacentHTML('afterend', errSpan);
    }
    // we are removing the error when status is valid
    private removeError(): void {
        const errorElement = document.getElementById(this.errorSpanId);
        const errorIconElement = document.getElementById('icon' + this.errorSpanId);
        if (errorElement) {
            errorElement.remove();
            errorIconElement.remove();
        }
    }

}



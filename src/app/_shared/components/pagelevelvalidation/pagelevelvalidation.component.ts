import { Component, OnInit } from '@angular/core';
import { PageLevelValidationService, IPageLevelValidation } from './pagelevelvalidation.service';

@Component({
  selector: 'app-shared-pagelevelvalidation',
  templateUrl: './pagelevelvalidation.component.html',
  styleUrls: ['./pagelevelvalidation.component.scss'],
})

export class PageLevelValidationComponent implements OnInit {
    validationErrorMessage: IPageLevelValidation;

  constructor(private pageValidationService: PageLevelValidationService) {}

  ngOnInit() {
      this.pageValidationService.getPageValidationMessage().subscribe((errorMessage) =>
      this.validationErrorMessage = errorMessage);
  }

}

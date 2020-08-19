import { Directive, ElementRef, Input, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from 'src/app/_core/services/auth.service';

@Directive({
  selector: '[appSectionControl]'
})
export class SectionControlDirective implements AfterContentInit {

  @Input() sectionControlUrl: string;
  @Input() sectionControlName: string;

  constructor(
    private element: ElementRef,
    private authService: AuthService
    ) {}

  private inputTagList = [
    'ion-input',
    'ion-select',
    'ion-checkbox',
    'ion-datetime',
    'ion-picker',
    'ion-radio',
    'ion-range',
    'ion-segment',
    'ion-text'
  ];
  ngAfterContentInit(): void {
    const moduleId = this.authService.getModuleId(this.sectionControlUrl);
    const pageId = this.authService.getPageId(this.sectionControlUrl);
    const sectionControlId = this.authService.getSectionControlId(this.sectionControlName);
    const isSectioncontrolEnabled = this.authService.isSectionControlEnabled(moduleId, pageId, sectionControlId);
    const isSectionControlVisible = this.authService.isSectionControlVisible(moduleId, pageId, sectionControlId);
    if (!isSectioncontrolEnabled) {

      this.element.nativeElement.setAttribute('disabled', true);
      this.inputTagList.forEach((tag) => {
        const elements = this.element.nativeElement.querySelectorAll(tag);
        if (elements.length > 0) {
          elements.forEach((e) => {
            e.setAttribute('disabled', true);
          });
        }
      });
    }
    if (!isSectionControlVisible) {
      this.element.nativeElement.style.display = 'none';
    }
  }



}

import { Component, Input, OnInit, Output, EventEmitter, AfterViewChecked, ElementRef } from '@angular/core';
import { ProviderType } from 'src/app/_shared/enum';
import { ColumnKeys, ColumnNameTags, RowKeys, IconRecommendation } from '../questionnaire-enum';
import { IOptionItem } from '../../_shared/components/iconoptions/iconoptions.component';
import { RecommendationInfo } from '../questionnaire-interface';
import { PopoverControllerComponent } from 'src/app/_shared/modals/popover-controller/popover-controller.component';
import { PopoverController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { compareTableData } from '../questionnaire.constant';

@Component({
  selector: 'app-questionnaire-recommendation',
  templateUrl: './questionnaire-recommendation.component.html',
  styleUrls: ['../../../stylesheet/modules/compare-table.scss' , '../../../stylesheet/modules/ion-popover.scss',
              './questionnaire-recommendation.component.scss'],
})

export class QuestionnaireRecommendationComponent implements OnInit, AfterViewChecked {
  compareTableData = compareTableData;
  data: any = {};
  show = false;
  programtypeIconList: IOptionItem[];
  columnKeys = ColumnKeys;
  RowKeys = RowKeys;
  notRecommended = false;
  rows = ['recommendList', 'summary', 'numberOfChildren', 'director', 'inspections', 'fees', 'location',
    'staffToChildRatio', 'capacity', 'services', 'training', 'trainingStaff', 'backgroundScreening', 'other'];
  _recommendList: any;

  @Input() set recommendList(value: RecommendationInfo[]) {
    if (value && value.length) {
      this._recommendList = value;
      this.notRecommended = value.length === 1 && !value[0].isRecommended;
      if (this.notRecommended) {
        this.rows.splice(2, this.rows.length - 1);
      }
      this.rows.forEach(rowKey => this.data[rowKey] = []);
      value.forEach(item => {
        if (item && item.label) {
          this.rows.forEach(rowKey => {
            if (rowKey === 'recommendList') {
              this.data[rowKey].push({
                [ColumnNameTags[item.label]]: item
              });
            } else {
              this.data[rowKey].push({
                [ColumnNameTags[item.label]]: this.compareTableData[rowKey].find(el => Object.keys(el).includes(ColumnNameTags[item.label])),
                isRecommended: item.isRecommended,
                recommendationDescription: item.recommendationDescription
              });
            }
          });
        }
      });
    }
  }

  @Input() propertyId: number;
  @Output() navigateToNext = new EventEmitter<void>();
  @Output() navigateToStart = new EventEmitter<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // set value for the option list control
    if (!this.data) {
      this.show = true;
    }
  }

  ngAfterViewChecked() {
    if (this.elementRef.nativeElement.querySelectorAll('.underline')) {
      this.elementRef.nativeElement.querySelectorAll('.underline').forEach((el) => {
        const description = el.attributes.description.value;
        el.addEventListener(
          'click', (e) => this.openDialog.call(this, e, description)
        );
      });
    }
  }

  // Generating Icons based upon the recommendation label
  generateProgramtypeIconList(reInfo: RecommendationInfo) {
    return [
      {
        text: reInfo.label,
        iconName: IconRecommendation[reInfo.label],
        value: ProviderType[reInfo.label.replace(/\s/g, '')],
        selected: true
      }
    ];
  }

  // Creating a hyperlink for the linkText and calling linkDescription associated with that particular
  // linkText Id
  linkText(text, colItem) {
    for (const key in colItem) {
      if (colItem.hasOwnProperty(key)) {
        if (key === 'linkText') {
          colItem[key].forEach((col, i) => {
            if (text.includes(col)) {
              text = text.replace(
                col, `<span expand="block" class="underline"
                  style=\"text-decoration: underline; cursor: pointer;\"
                  description="${colItem.linkDescription[i]}">${col}</span>`
              );
            }
          });
        }
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }

  // Finding the LinkText in the JSON format of Compare Table Data
  isContainsLink(colItem: {}) {
    for (const key in colItem) {
      if (colItem.hasOwnProperty(key)) {
        if (key === 'linkText') {
          return true;
        }
      }
    }
    return false;
  }

  isArray(item): boolean {
    return Array.isArray(item);
  }

  trimIconName(iconName: string) {
    const index = iconName.indexOf('fa');
    if (index > -1) {
      return iconName.slice(index + 2);
    }
    return '';
  }

  goToNext() {
    this.navigateToNext.emit();
  }

  goToStart() {
    this.navigateToStart.emit();
  }

  returnZero() {
    return 0;
  }

  // Calling Pop-over controller
  async openDialog(ev, value) {
    const popover = await this.popoverController.create({
      component: PopoverControllerComponent,
      componentProps: { description: value },
      showBackdrop: true,
      event: ev,
      translucent: true,
      mode: 'ios'
    });
    return await popover.present();
  }

  isContainOptions(item) {
    if (typeof item[0] === 'object') {
      return true;
    }
    return false;
  }


}

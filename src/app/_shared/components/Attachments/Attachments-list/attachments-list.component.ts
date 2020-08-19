import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Constant } from '../../../constant';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { AttachmentsPopoverComponent } from 'src/app/_shared/modals/attachments-popover/attachments-popover.component';
import { ApplicationService } from 'src/app/application/application.service';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressStatusEnum } from 'src/app/_shared/enum';
import {ProgressStatus} from '../../../../../app/application/application-interface';


@Component({
  selector: 'app-shared-attachments-list',
  templateUrl: './attachments-list.component.html',
  styleUrls: ['./attachments-list.component.scss']
})
export class AttachmentsListComponent implements OnInit {
  fileInputGroup: FormGroup;
  validationMsgId: any = null;
  attachmentsList: any[] = [];
  acceptedFiles: string[] = [];
  acceptedFilesTypes = '';
  @Input() public disabled: boolean;
  @ViewChild('inputFile') inputFile: ElementRef;
  @Output() uploadStatus = new EventEmitter<ProgressStatus>();
  showAttachmentList = false;
  errorMsg = '';
  errorList = [];
  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private applicationService: ApplicationService,
              public popoverController: PopoverController) { }

  ngOnInit() {
    this.fileInputGroup = this.fb.group({
      fileInput: new FormControl('', [Validators.required])
    });
    this.attachmentsList = [];
    this.showAttachmentList = this.attachmentsList.length ? true : false;
    this.acceptedFiles = Constant.acceptedFileTypes;
    this.acceptedFilesTypes = Constant.acceptedFileTypes.join(',');
  }

  loadImageFromDevice(event, btnType) {
    this.upload(event);
    this.errorList = [];
    this.errorMsg = '';
    const file = event.target.files[0];
    if (!file) {
      if (btnType !== 'selectFromIcon') {
        this.validationMsgId = 'attachReqFile-required-msg';
        this.errorList.push(Constant.errorMessages[this.validationMsgId]);
      }
      return;
    }
    const fileName = file.name;
    let type = fileName.split('.')[1];
    type = '.' + type;
    const isValidFileType = this.acceptedFiles.find((fileType) => {
      return fileType.toLowerCase() === type.toLowerCase();
    });
    if (!isValidFileType) {
      this.validationMsgId = 'attachFileType-invalid-msg';
      this.errorList.push(Constant.errorMessages[this.validationMsgId]);
    }
    if ((file.size / 1024 / 1024) > 2) {
      this.validationMsgId = 'attachFileSize-invalid-msg';
      this.errorList.push(Constant.errorMessages[this.validationMsgId]);
    }

    if (this.errorList.length) {
      return;
    }
    this.attachmentsList.push({
      file,
      imageURL: URL.createObjectURL(event.target.files[0]),
      description: ''
    });
    this.showAttachmentList = true;

  }

  upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.uploadStatus.emit({status: ProgressStatusEnum.START});
      this.applicationService.uploadFile(file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
                break;
            }
          }
        },
        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatus.emit({status: ProgressStatusEnum.ERROR});
        }
      );
    }
    }



  async menu(event) {
    const popover = await this.popoverController.create({
      component: AttachmentsPopoverComponent,
      showBackdrop: true,
      event,
      translucent: true
    });
    return await popover.present();
  }

}

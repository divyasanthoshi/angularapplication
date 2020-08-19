import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Input() attachmentCount: number;
    constructor(private router: Router) {}

    ngOnInit() {
    }

    attachmentsList() {
      this.router.navigate(['/application/attachmentslist']);
    }

}

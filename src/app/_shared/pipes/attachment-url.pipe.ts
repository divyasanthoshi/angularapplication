import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'attachmentUrl'
})
export class AttachmentUrlPipe implements PipeTransform {

    constructor(
        private sanitize: DomSanitizer
    ) { }

    transform(value: string): SafeUrl {
        return this.sanitize.bypassSecurityTrustUrl(value);
    }
}

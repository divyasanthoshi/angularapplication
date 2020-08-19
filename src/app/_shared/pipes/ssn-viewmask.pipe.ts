import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ssnviewmask'
})

export class SSNViewMaskPipe implements PipeTransform {
    transform(ssn: string): string {
      const visibleDigits = 4;
      const maskedSection = ssn.slice(0, -visibleDigits);
      const visibleSection = ssn.slice(-visibleDigits);
      return maskedSection.replace(/./g, '*') + visibleSection;
    }
}

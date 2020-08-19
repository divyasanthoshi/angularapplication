import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskingPipe implements PipeTransform {


  transform(value: string, maskPattern: string) {
    // verify user input

    if (value && maskPattern === 'LNNN-NNN-NN-NNN-N') {
      const maskedValue = value.slice(0, 4) + '-' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 12) + '-' + value.slice(12);
      return maskedValue;

    } else if (value && maskPattern === 'NN-NNNNNNN') {
      const maskedValue = value.slice(0, 2) + '-' + value.slice(2);
    } else {
  return null;
}


}
}


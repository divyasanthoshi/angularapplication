import { Pipe, PipeTransform } from '@angular/core';
import { startCase } from 'lodash';

@Pipe({
  name: 'forms'
})
export class FormsPipe implements PipeTransform {

  // transform(value: number, enumName: any): string {
  //   return startCase(enumName[value]);
  // }

  transform(value: number, options: any[], idKey: string, descriptionKey: string): string  | number {
    if (options && options.length) {
      const matchedOption = options.find(option => option[idKey] === value);
      if (matchedOption && matchedOption[descriptionKey]) {
        return matchedOption[descriptionKey];
      }
      return value;
    } else {
      return value;
    }
  }

}

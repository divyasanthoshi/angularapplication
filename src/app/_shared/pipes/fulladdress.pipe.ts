import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../Interfaces/businessentity';


@Pipe({
  name: 'fulladdress'
})
export class FulladdressPipe implements PipeTransform {

  transform(value: Address): string {
    if (value) {
      return `${value.streetAddress},
               ${value.city}, ${value.state} ${value.zipCode}`;
    }
  }

}

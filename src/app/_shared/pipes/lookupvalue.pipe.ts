import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lookupvalue'
})
export class LookupvaluePipe implements PipeTransform {

  /* this pipe is used to display the description from a value,
  lookup: look up data for the lookup;
  key: an integer value to locate the description from the lookup
  keyName: the name for the key value
  valueName: the name for the description of the values, default to 'description'

  use case: try to display person type based on persontypeid

  |    lookup     |                |    key    |               |valueName|
  lookup.personType | lookupvalue: personTypeId:'personTypeId':'personType'

  */
  transform(lookup: Array<any>, key: number, keyName: string, valueName = 'description'): object {
    let result = new Object();
    try {
      result = lookup.filter((value) => value[keyName] === key)[0][valueName];
    } catch (ex) {
      console.error(`lookupvalue Pipe: lookup:${JSON.stringify(lookup)}, key: ${key}, keyname: ${keyName}: ${ex}`);
    }
    return result;
  }
}

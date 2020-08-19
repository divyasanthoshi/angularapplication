import { Pipe, PipeTransform } from '@angular/core';
import { Personnel } from 'src/app/application/application-interface';


@Pipe({

  name: 'peopleSearch'
})
export class PeopleSearchPipe implements PipeTransform {

  transform(value: Personnel[][], userInput: string) {
    // verify user input
    userInput = userInput ? userInput.toLowerCase() : null;
    return userInput ? value.map((personnelarray) =>
      personnelarray.filter(person =>
        person.firstName.toLowerCase().includes(userInput.toLowerCase()) || person.lastName.toLowerCase().includes(userInput.toLowerCase()))) : value;
  }
}



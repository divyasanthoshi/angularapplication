import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {


  transform(value: string, userInput: string) {
    // verify user input
    userInput = userInput ? userInput.charAt(0).toLowerCase() : null;
    if (userInput) {
      if (userInput === value.trim().charAt(0).toLowerCase()) {
        return value;
      }  else {
        return null ;
      }
    } else {
      return value;
    }
}


}

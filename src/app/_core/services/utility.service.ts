import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
public unmaskedValue: number;
  constructor() { }

  public replacePhoneNumber(maskedInput): number {
    return this.unmaskedValue = maskedInput ? Number(maskedInput.toString().replace('(', '').replace(')', '').replace('-', '').replace(' ', '')) : null;
    }

    public replaceSSNNumber(maskedInput): number {
      return this.unmaskedValue = maskedInput ? Number(maskedInput.toString().replace(/-/g, '')) : null;
      }
      public replaceDLNumber(maskedInput): number {
        return this.unmaskedValue = maskedInput ? maskedInput.toString().replace(/-/g, '') : null;
        }

}

import { FormGroup, AbstractControl } from '@angular/forms';

// To validate person Name with Full name entered in the forms
export function CompareName(
    personName: string,
    formSignedBy: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[personName];
    const matchingControl = formGroup.controls[formSignedBy];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFields(firstField: string, secondField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstField);

    const secondControl = control.get(secondField);

    if (!firstControl || !secondControl) {
      return null;
    }

    if (
      firstControl.value === null ||
      secondControl.value === null ||
      firstControl.value === '' ||
      secondControl.value === ''
    ) {
      return null;
    }

    if (firstControl.value !== secondControl.value) {
      return {
        matchFields: {
          fields: [firstField, secondField],
        },
      };
    }

    return null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { KePasswordRules, KePasswordStrength } from '../../password';

export function passwordStrength(options: KePasswordRules = {}): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const result = KePasswordStrength.analyze(String(value), options);

    if (result.isStrong) {
      return null;
    }

    return {
      passwordStrength: {
        score: result.score,
        maxScore: result.maxScore,
        percentage: result.percentage,
        label: result.label,
        checks: result.checks,
        failedRules: result.failedRules,
      },
    };
  };
}

import { ValidatorFn } from '@angular/forms';

import { required } from './required';
import { email } from './email';

import { url, UrlValidatorOptions } from './url';

import { phone, PhoneValidatorOptions } from './phone';

import { min } from './min';
import { max } from './max';

import { minLength } from './min-length';
import { maxLength } from './max-length';

import { pattern } from './pattern';

import { passwordStrength } from './password-strength';

import { matchFields } from './match-fields';

import { KePasswordRules } from '../password';

export class KeValidators {
  /**
   * Required field validator
   */
  static required(): ValidatorFn {
    return required();
  }

  /**
   * Email validator
   */
  static email(): ValidatorFn {
    return email();
  }

  /**
   * URL validator
   */
  static url(options?: UrlValidatorOptions): ValidatorFn {
    return url(options);
  }

  /**
   * Phone number validator
   */
  static phone(options?: PhoneValidatorOptions): ValidatorFn {
    return phone(options);
  }

  /**
   * Minimum numeric value
   */
  static min(value: number): ValidatorFn {
    return min(value);
  }

  /**
   * Maximum numeric value
   */
  static max(value: number): ValidatorFn {
    return max(value);
  }

  /**
   * Minimum string/array length
   */
  static minLength(value: number): ValidatorFn {
    return minLength(value);
  }

  /**
   * Maximum string/array length
   */
  static maxLength(value: number): ValidatorFn {
    return maxLength(value);
  }

  /**
   * Custom pattern validator
   */
  static pattern(value: string | RegExp): ValidatorFn {
    return pattern(value);
  }

  /**
   * Password strength validator
   */
  static passwordStrength(options?: KePasswordRules): ValidatorFn {
    return passwordStrength(options);
  }

  /**
   * Match two fields
   *
   * Example:
   * matchFields('password', 'confirmPassword')
   */
  static matchFields(firstField: string, secondField: string): ValidatorFn {
    return matchFields(firstField, secondField);
  }
}

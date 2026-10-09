import { Signal, computed } from '@angular/core';

import { KePasswordRules } from './password-rules';

import { KePasswordStrength, KePasswordStrengthResult } from './password-strength';

export function passwordStrengthSignal(
  password: Signal<string>,
  rules?: KePasswordRules,
): Signal<KePasswordStrengthResult> {
  return computed(() => KePasswordStrength.analyze(password(), rules));
}

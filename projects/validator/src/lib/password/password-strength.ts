import { DEFAULT_PASSWORD_RULES, KePasswordRules } from './password-rules';

export type KePasswordStrengthLabel = 'Weak' | 'Fair' | 'Good' | 'Strong';

export interface KePasswordChecks {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}

export interface KePasswordStrengthResult {
  score: number;
  maxScore: number;
  percentage: number;
  label: KePasswordStrengthLabel;
  checks: KePasswordChecks;
  failedRules: string[];
  isStrong: boolean;
}

export class KePasswordStrength {
  static analyze(password: string, rules: KePasswordRules = {}): KePasswordStrengthResult {
    const config = {
      ...DEFAULT_PASSWORD_RULES,
      ...rules,
    };

    const value = password ?? '';

    const checks: KePasswordChecks = {
      minLength: value.length >= config.minLength,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[^A-Za-z0-9]/.test(value),
    };

    const activeChecks: boolean[] = [checks.minLength];

    if (config.requireUppercase) {
      activeChecks.push(checks.uppercase);
    }

    if (config.requireLowercase) {
      activeChecks.push(checks.lowercase);
    }

    if (config.requireNumber) {
      activeChecks.push(checks.number);
    }

    if (config.requireSpecialChar) {
      activeChecks.push(checks.specialChar);
    }

    const maxScore = activeChecks.length;

    const score = activeChecks.filter(Boolean).length;

    const percentage = maxScore === 0 ? 100 : Math.round((score / maxScore) * 100);

    const failedRules = this.getFailedRules(checks, config);

    const label = this.getLabel(percentage);

    return {
      score,
      maxScore,
      percentage,
      label,
      checks,
      failedRules,
      isStrong: failedRules.length === 0,
    };
  }

  static score(password: string, rules?: KePasswordRules): number {
    return this.analyze(password, rules).score;
  }

  static percentage(password: string, rules?: KePasswordRules): number {
    return this.analyze(password, rules).percentage;
  }

  static label(password: string, rules?: KePasswordRules): KePasswordStrengthLabel {
    return this.analyze(password, rules).label;
  }

  static checks(password: string, rules?: KePasswordRules): KePasswordChecks {
    return this.analyze(password, rules).checks;
  }

  static isStrong(password: string, rules?: KePasswordRules): boolean {
    return this.analyze(password, rules).isStrong;
  }

  private static getLabel(percentage: number): KePasswordStrengthLabel {
    if (percentage < 40) {
      return 'Weak';
    }

    if (percentage < 60) {
      return 'Fair';
    }

    if (percentage < 80) {
      return 'Good';
    }

    return 'Strong';
  }

  private static getFailedRules(
    checks: KePasswordChecks,
    rules: Required<KePasswordRules>,
  ): string[] {
    const failedRules: string[] = [];

    if (!checks.minLength) {
      failedRules.push('minLength');
    }

    if (rules.requireUppercase && !checks.uppercase) {
      failedRules.push('uppercase');
    }

    if (rules.requireLowercase && !checks.lowercase) {
      failedRules.push('lowercase');
    }

    if (rules.requireNumber && !checks.number) {
      failedRules.push('number');
    }

    if (rules.requireSpecialChar && !checks.specialChar) {
      failedRules.push('specialChar');
    }

    return failedRules;
  }
}

# @kudoengineer/validator

Modern, lightweight, type-safe validation utilities for Angular applications.

Built for modern Angular applications with **Reactive Forms, Typed Forms, Sync & Async Validators, Password Strength, Custom Validators, Error Messages, and Signals**.

[![npm version](https://img.shields.io/npm/v/@kudoengineer/validator.svg)](https://www.npmjs.com/package/@kudoengineer/validator)
[![npm downloads](https://img.shields.io/npm/dm/@kudoengineer/validator.svg)](https://www.npmjs.com/package/@kudoengineer/validator)
[![Angular](https://img.shields.io/badge/Angular-22%2B-DD0031.svg)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Features

- ✅ Angular Reactive Forms
- ✅ Typed Forms friendly
- ✅ Standalone compatible
- ✅ Sync Validators
- ✅ Async Validators
- ✅ Custom Async Validation
- ✅ Password Strength Engine
- ✅ Password Strength Signals
- ✅ Match Fields Validation
- ✅ Email Validation
- ✅ URL Validation
- ✅ Phone Validation
- ✅ Min / Max Validation
- ✅ Min / Max Length Validation
- ✅ Pattern Validation
- ✅ Unique Value Validation
- ✅ Exists Validation
- ✅ Validation Error Utilities
- ✅ Custom Error Messages
- ✅ TypeScript support
- ✅ Tree-shakable
- ✅ Lightweight API
- ✅ No UI components
- ✅ No CSS required

---

## 📦 Installation

Install the package using npm:

```bash
npm install @kudoengineer/validator
```

---

## 🚀 Quick Start

Import the validators:

```ts
import { KeValidators } from '@kudoengineer/validator';
```

Use them with Angular Reactive Forms:

```ts
import { FormBuilder } from '@angular/forms';
import { KeValidators } from '@kudoengineer/validator';

export class RegisterComponent {
  constructor(private readonly fb: FormBuilder) {}

  form = this.fb.group({
    name: ['', [KeValidators.required(), KeValidators.minLength(3), KeValidators.maxLength(50)]],

    email: ['', [KeValidators.required(), KeValidators.email()]],

    password: ['', [KeValidators.required(), KeValidators.passwordStrength()]],
  });
}
```

---

# 🧩 Sync Validators

## Required

```ts
KeValidators.required();
```

Example:

```ts
name: ['', [KeValidators.required()]];
```

---

## Email

```ts
KeValidators.email();
```

Example:

```ts
email: ['', [KeValidators.required(), KeValidators.email()]];
```

---

## URL

```ts
KeValidators.url();
```

By default, `http:` and `https:` are supported.

```ts
website: ['', [KeValidators.url()]];
```

### URL Options

```ts
KeValidators.url({
  protocols: ['http:', 'https:'],
  requireProtocol: true,
});
```

---

## Phone

```ts
KeValidators.phone();
```

Example:

```ts
phone: ['', [KeValidators.phone()]];
```

### Phone Options

```ts
KeValidators.phone({
  minLength: 10,
  maxLength: 15,
  allowSpaces: true,
  allowPlus: true,
  allowHyphens: true,
});
```

---

## Min

Validates the minimum numeric value.

```ts
KeValidators.min(18);
```

Example:

```ts
age: ['', [KeValidators.min(18)]];
```

---

## Max

Validates the maximum numeric value.

```ts
KeValidators.max(100);
```

Example:

```ts
age: ['', [KeValidators.max(100)]];
```

---

## Min Length

```ts
KeValidators.minLength(8);
```

Example:

```ts
username: ['', [KeValidators.minLength(3)]];
```

---

## Max Length

```ts
KeValidators.maxLength(20);
```

Example:

```ts
username: ['', [KeValidators.maxLength(20)]];
```

---

## Pattern

Accepts either a string pattern or `RegExp`.

```ts
KeValidators.pattern(/^[A-Z]+$/);
```

Example:

```ts
code: ['', [KeValidators.pattern(/^[A-Z0-9]+$/)]];
```

---

# 🔐 Password Strength

The package includes a reusable password-strength engine.

```ts
import { KePasswordStrength } from '@kudoengineer/validator';
```

Analyze a password:

```ts
const result = KePasswordStrength.analyze('MyPassword@123');
```

Result contains:

```ts
{
  score: 5,
  maxScore: 5,
  percentage: 100,
  label: 'Strong',
  checks: {
    minLength: true,
    uppercase: true,
    lowercase: true,
    number: true,
    specialChar: true
  },
  failedRules: [],
  isStrong: true
}
```

---

## Password Strength Validator

Use it directly inside Reactive Forms:

```ts
password: ['', [KeValidators.passwordStrength()]];
```

### Custom Password Rules

```ts
KeValidators.passwordStrength({
  minLength: 10,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
});
```

---

# ⚡ Password Strength Signals

Use the password strength engine with Angular Signals.

```ts
import { signal } from '@angular/core';

import { passwordStrengthSignal } from '@kudoengineer/validator';

password = signal('');

strength = passwordStrengthSignal(this.password);
```

Template:

```html
<p>Strength: {{ strength().label }}</p>

<p>Score: {{ strength().score }}/{{ strength().maxScore }}</p>

<p>Progress: {{ strength().percentage }}%</p>
```

Check strength:

```ts
strength().isStrong;
```

Get failed rules:

```ts
strength().failedRules;
```

---

# 🔄 Match Fields

Useful for:

- Password confirmation
- Email confirmation
- PIN confirmation
- Any two matching fields

Example:

```ts
import { FormBuilder } from '@angular/forms';

import { KeValidators } from '@kudoengineer/validator';

form = this.fb.group(
  {
    password: [''],
    confirmPassword: [''],
  },
  {
    validators: [KeValidators.matchFields('password', 'confirmPassword')],
  },
);
```

---

# 🌐 Async Validators

The package supports asynchronous validation through callbacks.

```ts
import { KeAsyncValidators } from '@kudoengineer/validator';
```

---

## Custom Async Validator

```ts
username: [
  '',
  [],
  [
    KeAsyncValidators.async(async (value) => {
      return value !== 'admin';
    }),
  ],
];
```

---

# 🔎 Unique Validator

Useful for checking:

- Username availability
- Email availability
- Mobile number availability
- Coupon codes
- Database uniqueness

Example:

```ts
username: [
  '',
  [],
  [
    KeAsyncValidators.unique(async (value) => {
      const available = await checkUsername(value);

      return available;
    }),
  ],
];
```

---

# 🔍 Exists Validator

Useful when a value must already exist.

Example:

```ts
userId: [
  '',
  [],
  [
    KeAsyncValidators.exists(async (value) => {
      return await checkUserExists(value);
    }),
  ],
];
```

---

# 🧰 Validation Error Utilities

Use `KeValidationErrors` to simplify error handling.

```ts
import { KeValidationErrors } from '@kudoengineer/validator';
```

### Check an error

```ts
KeValidationErrors.has(control, 'required');
```

### Get an error

```ts
KeValidationErrors.get(control, 'email');
```

### Get all errors

```ts
KeValidationErrors.all(control);
```

### Check invalid state

```ts
KeValidationErrors.isInvalid(control);
```

### Check valid state

```ts
KeValidationErrors.isValid(control);
```

### Get first error

```ts
KeValidationErrors.first(control);
```

Example result:

```ts
{
  key: 'required',
  value: true
}
```

### Get first error key

```ts
KeValidationErrors.firstKey(control);
```

### Get all errors

```ts
KeValidationErrors.list(control);
```

---

# 💬 Validation Messages

Get a ready-to-display validation message:

```ts
KeValidationErrors.message(control);
```

Example:

```ts
const message = KeValidationErrors.message(this.form.controls.email);
```

Possible result:

```text
Please enter a valid email address.
```

---

## Custom Validation Messages

```ts
KeValidationErrors.message(control, {
  messages: {
    required: 'Email is required.',

    email: 'Please enter a valid work email.',
  },
});
```

---

## Dynamic Error Messages

Messages can also be functions:

```ts
KeValidationErrors.message(control, {
  messages: {
    minLength: (error) => `Minimum ${error.requiredLength} characters required.`,
  },
});
```

---

# 📋 Multiple Error Messages

Get all validation messages:

```ts
KeValidationErrors.messages(control);
```

Example:

```ts
['This field is required.', 'Please enter a valid email address.'];
```

---

# 🎯 Typed Forms

The library works with Angular Typed Reactive Forms.

```ts
import { FormControl, FormGroup } from '@angular/forms';

import { KeValidators } from '@kudoengineer/validator';

form = new FormGroup({
  email: new FormControl<string>('', {
    nonNullable: true,
    validators: [KeValidators.required(), KeValidators.email()],
  }),

  age: new FormControl<number>(18, {
    nonNullable: true,
    validators: [KeValidators.min(18), KeValidators.max(100)],
  }),
});
```

---

# 🧱 Direct Validator Functions

You can also import individual validators instead of using `KeValidators`.

```ts
import {
  required,
  email,
  phone,
  url,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  passwordStrength,
  matchFields,
} from '@kudoengineer/validator';
```

Example:

```ts
email: ['', [required(), email()]];
```

This can be useful when you prefer functional APIs.

---

# 📚 API Overview

| API                               | Purpose                    |
| --------------------------------- | -------------------------- |
| `KeValidators.required()`         | Required field             |
| `KeValidators.email()`            | Email validation           |
| `KeValidators.url()`              | URL validation             |
| `KeValidators.phone()`            | Phone validation           |
| `KeValidators.min()`              | Minimum numeric value      |
| `KeValidators.max()`              | Maximum numeric value      |
| `KeValidators.minLength()`        | Minimum length             |
| `KeValidators.maxLength()`        | Maximum length             |
| `KeValidators.pattern()`          | Pattern validation         |
| `KeValidators.passwordStrength()` | Password validation        |
| `KeValidators.matchFields()`      | Match two fields           |
| `KeAsyncValidators.async()`       | Custom async validation    |
| `KeAsyncValidators.unique()`      | Unique value validation    |
| `KeAsyncValidators.exists()`      | Exists validation          |
| `KeValidationErrors.has()`        | Check error                |
| `KeValidationErrors.get()`        | Get error                  |
| `KeValidationErrors.message()`    | Get error message          |
| `KeValidationErrors.messages()`   | Get all messages           |
| `KePasswordStrength.analyze()`    | Analyze password           |
| `passwordStrengthSignal()`        | Reactive password strength |

---

# 🌳 Tree-Shakable

`@kudoengineer/validator` is designed with a modular API so unused functionality can be removed by modern build tools.

You can import only what you need:

```ts
import { email, required } from '@kudoengineer/validator';
```

---

# 🪶 Lightweight

The library is designed as a **utility-first validation package**.

It does not provide:

- ❌ UI components
- ❌ CSS
- ❌ Form controls
- ❌ External validation services

You control the UI and form implementation.

---

# 🧑‍💻 Angular Compatibility

Designed for modern Angular applications.

| Technology             | Support   |
| ---------------------- | --------- |
| Angular                | 22+       |
| TypeScript             | Supported |
| Reactive Forms         | ✅        |
| Typed Forms            | ✅        |
| Signals                | ✅        |
| Standalone APIs        | ✅        |
| SSR friendly utilities | ✅        |

---

## About KudoEngineer

**KudoEngineer** is a developer-focused platform created by **Satendra Rajput**, providing modern, reusable and production-ready tools, libraries and resources for developers.

Explore more Angular, Java, Spring Boot, TypeScript and developer tools at:

**🌐 KudoEngineer:** https://kudoengineer.com <br>
**📦 NPM Organization:** https://github.com/kudoengineer <br>
**💼 LinkedIn:** https://www.linkedin.com/in/satendra2rajput/

---

## Contributing

Contributions, ideas, bug reports and feature requests are welcome.

If you find an issue or have an idea that can make this package better, feel free to open an issue or submit a pull request.

---

## Support the Project

If this package helps you build better applications, please consider:

- ⭐ Giving the project a star
- 📦 Using the package in your projects
- 🐛 Reporting bugs
- 💡 Suggesting improvements
- 🤝 Contributing to the project
- 📢 Sharing it with other developers

Your support helps **KudoEngineer** continue building open-source developer tools and libraries.

---

## License

This project is licensed under the **MIT License**.

You are free to use, modify and distribute this package according to the terms of the license.

---

<div align="center">

### 🚀 Built for Developers by Developers

**Built with ❤️ by [Satendra Rajput](https://kudoengineer.com)**

**KudoEngineer — Modern Developer Tools & Open Source Libraries**

🌐 **[Website](https://kudoengineer.com)**
📦 **[NPM Packages](https://www.npmjs.com/org/kudoengineer)**
💼 **[LinkedIn](https://www.linkedin.com/in/satendrarajput/)**

<br>

**Angular • TypeScript • Java • Spring Boot • Developer Tools • Open Source • NPM Packages**

<br>

© 2026 **KudoEngineer** · Created and maintained by **Satendra Rajput**

</div>

---

### Keywords

`KudoEngineer` · `Angular` · `Angular Library` · `Angular NPM Package` · `TypeScript` · `JavaScript` · `Developer Tools` · `Open Source` · `NPM Package` · `Angular Components` · `Web Development` · `Frontend Development` · `Software Development`

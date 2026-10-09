# @kudoengineer/forms

A modern and reusable Angular Reactive Forms utility library for building, managing, validating, and submitting forms with less boilerplate.

`@kudoengineer/forms` provides reusable form builders, control utilities, validation error handling, form state management, submission helpers, reset/patch utilities, and value helpers for Angular applications.

## ✨ Features

- 🧩 Reactive Forms utilities
- 🏗️ Form and control builders
- 🎯 FormControl and FormGroup helpers
- 📋 FormArray utilities
- ⚠️ Centralized validation error handling
- 📊 Signal-based form state management
- 🚀 Form submission utilities
- 🔄 Form reset and patch helpers
- 📦 Form value and raw value utilities
- 🧹 Dirty form value extraction
- ⚡ Angular 20+ support
- 🌳 Tree-shakable API
- 📘 TypeScript support

## 📦 Installation

```bash
npm install @kudoengineer/forms
```

## 🚀 Basic Usage

```typescript
import {
  KudoFormBuilderService,
  KudoFormErrorService,
  KudoFormStateService,
} from '@kudoengineer/forms';

export class UserComponent {
  constructor(
    private formBuilder: KudoFormBuilderService,
    private formErrors: KudoFormErrorService,
    private formState: KudoFormStateService,
  ) {}

  form = this.formBuilder.group({
    name: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
  });
}
```

## 🏗️ Form Control Builder

```typescript
import { KudoFormControlBuilderService } from '@kudoengineer/forms';

export class UserComponent {
  constructor(private controls: KudoFormControlBuilderService) {}

  name = this.controls.text();

  email = this.controls.email();

  age = this.controls.number(18);

  active = this.controls.boolean(true);
}
```

## ⚠️ Form Error Handling

```typescript
import { KudoFormErrorService } from '@kudoengineer/forms';

const errors = this.formErrorService.getErrors(this.form);
```

Example result:

```typescript
[
  {
    controlName: 'email',
    errorKey: 'required',
    message: 'This field is required.',
  },
];
```

Get the first form error:

```typescript
const error = this.formErrorService.getFirstError(this.form);
```

## 📊 Form State

The library provides signal-based form state.

```typescript
import { KudoFormStateService } from '@kudoengineer/forms';

state = this.formStateService.state();

valid = this.formStateService.valid();

dirty = this.formStateService.dirty();

submitted = this.formStateService.submitted();

submitting = this.formStateService.submitting();
```

## 🚀 Form Submission

Supports both `Promise` and RxJS `Observable`.

```typescript
await this.formSubmitService.submit(
  this.form,
  () => this.userService.createUser(this.form.getRawValue()),
  {
    markAllAsTouched: true,
    resetAfterSuccess: true,
  },
);
```

## 🔄 Form Utilities

### Get Form Value

```typescript
const value = getFormValue(this.form);
```

### Get Raw Value

Disabled controls are included:

```typescript
const value = getFormRawValue(this.form);
```

### Patch Form

```typescript
patchFormGroup(this.form, {
  name: 'Satendra',
});
```

### Reset Form

```typescript
resetFormGroup(this.form);
```

### Get Dirty Values

Useful when sending only changed fields to an API:

```typescript
const changes = getDirtyValues(this.form);
```

## 📋 FormArray Utilities

```typescript
addToFormArray(this.items, this.formBuilder.control(''));
```

Remove an item:

```typescript
removeFromFormArray(this.items, 0);
```

Move an item:

```typescript
moveFormArrayControl(this.items, 0, 2);
```

## 🧩 Available APIs

### Builders

- `KudoFormBuilderService`
- `KudoFormControlBuilderService`

### Error Handling

- `KudoFormErrorService`
- `getErrorKeys()`
- `getFirstErrorKey()`
- `getFirstFormError()`
- `getDefaultErrorMessage()`

### Form State

- `KudoFormStateService`
- `getFormState()`
- `isFormReadyForSubmit()`
- `canSubmitForm()`
- `hasFormInteraction()`
- `isFormProcessing()`

### Form Submission

- `KudoFormSubmitService`

### Form Controls

- `setControlValue()`
- `resetControl()`
- `enableControl()`
- `disableControl()`
- `hasControlError()`
- `getControlError()`
- `updateControlValidity()`

### Form Groups

- `getFormControl()`
- `hasFormControl()`
- `setFormValue()`
- `patchFormValue()`
- `resetForm()`
- `markFormAsTouched()`
- `enableForm()`
- `disableForm()`
- `updateFormValidity()`

### FormArray

- `addToFormArray()`
- `insertIntoFormArray()`
- `removeFromFormArray()`
- `setFormArrayControl()`
- `moveFormArrayControl()`
- `getFormArrayControl()`
- `clearFormArray()`
- `getFormArrayLength()`

### Reset & Patch

- `resetFormControl()`
- `resetFormGroup()`
- `resetFormArray()`
- `resetFormState()`
- `resetFormPreserveState()`
- `resetControlToValue()`
- `patchFormGroup()`
- `patchFormControl()`
- `patchFormControls()`
- `patchFormArrayControl()`
- `patchAndValidate()`

### Values

- `getControlValue()`
- `getFormValue()`
- `getFormRawValue()`
- `getFormControlValue()`
- `getFormControlRawValue()`
- `getFormArrayValues()`
- `getFormArrayRawValues()`
- `hasFormValue()`
- `getDirtyValues()`

## 🌐 Angular Compatibility

| Angular    | Support |
| ---------- | ------- |
| Angular 20 | ✅      |
| Angular 21 | ✅      |
| Angular 22 | ✅      |
| Angular 23 | ✅      |

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

# @sr/forms

A modern, reusable Angular Reactive Forms utility library designed to simplify form creation, validation, state management, submission, and common form operations with less boilerplate.

`@sr/forms` provides reusable form builders, control utilities, validation error handling, signal-based form state management, submission helpers, reset and patch utilities, and form value helpers for Angular applications.

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
npm install @sr/forms
```

## 🚀 Basic Usage

```typescript
import { SRFormBuilderService, SRFormErrorService, SRFormStateService } from '@sr/forms';

export class UserComponent {
  constructor(
    private formBuilder: SRFormBuilderService,
    private formErrors: SRFormErrorService,
    private formState: SRFormStateService,
  ) {}

  form = this.formBuilder.group({
    name: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
  });
}
```

## 🏗️ Form Control Builder

Create commonly used form controls with reusable builder methods.

```typescript
import { SRFormControlBuilderService } from '@sr/forms';

export class UserComponent {
  constructor(private controls: SRFormControlBuilderService) {}

  name = this.controls.text();

  email = this.controls.email();

  age = this.controls.number(18);

  active = this.controls.boolean(true);
}
```

## ⚠️ Form Error Handling

Use the error service to retrieve validation errors from your form.

```typescript
import { SRFormErrorService } from '@sr/forms';

const errors = this.formErrors.getErrors(this.form);
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
const error = this.formErrors.getFirstError(this.form);
```

## 📊 Signal-Based Form State

Manage form state using Angular signals.

```typescript
import { SRFormStateService } from '@sr/forms';

state = this.formState.state();

valid = this.formState.valid();

dirty = this.formState.dirty();

submitted = this.formState.submitted();

submitting = this.formState.submitting();
```

## 🚀 Form Submission

The library supports Promise- and RxJS Observable-based submission workflows.

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

### Get Raw Form Value

Includes disabled controls:

```typescript
const value = getFormRawValue(this.form);
```

### Patch Form Values

```typescript
patchFormGroup(this.form, {
  name: 'Satendra',
});
```

### Reset Form

```typescript
resetFormGroup(this.form);
```

### Extract Dirty Values

Useful for sending only changed fields to an API:

```typescript
const changes = getDirtyValues(this.form);
```

## 📋 FormArray Utilities

Add a control:

```typescript
addToFormArray(this.items, this.formBuilder.control(''));
```

Remove a control:

```typescript
removeFromFormArray(this.items, 0);
```

Move a control:

```typescript
moveFormArrayControl(this.items, 0, 2);
```

## 🧩 Available APIs

### Builders

- `SRFormBuilderService`
- `SRFormControlBuilderService`

### Error Handling

- `SRFormErrorService`
- `getErrorKeys()`
- `getFirstErrorKey()`
- `getFirstFormError()`
- `getDefaultErrorMessage()`

### Form State

- `SRFormErrorService`
- `getFormState()`
- `isFormReadyForSubmit()`
- `canSubmitForm()`
- `hasFormInteraction()`
- `isFormProcessing()`

### Form Submission

- `SRFormSubmitService`

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

### Reset and Patch

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

The package targets Angular 20+.

| Angular Version | Support |
| --------------- | ------- |
| Angular 20      | ✅      |
| Angular 21      | ✅      |
| Angular 22      | ✅      |
| Angular 23      | ✅      |

Check the package peer dependencies for the versions supported by the release you install.

## 👨‍💻 Author

**Satendra Rajput**

Senior Software Engineer | Angular & Java Spring Boot Developer | Microservices | Banking & Fintech — Axis Bank LOS, ADCB LOS, AEPS, Micro-ATM, RBAC | Open Source Contributor

- **Website:** https://www.satendra2rajput.com/
- **LinkedIn:** https://www.linkedin.com/in/satendra2rajput/
- **Open Source Package:** https://github.com/satendra2rajput/sr-angular-npm/tree/main/projects/forms

## 🤝 Contributing

Contributions, bug reports, feature requests, and suggestions are welcome.

If you find an issue or want to improve the library, please open an issue or submit a pull request in the project's source repository.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Built with ❤️ by Satendra Rajput**

_Reusable Angular form utilities for cleaner, more maintainable applications._

**Keywords:** Angular, Reactive Forms, Angular Forms, TypeScript, Form Validation, FormBuilder, FormControl, FormGroup, FormArray, Angular Signals, npm Package, Open Source

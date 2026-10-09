# @kudoengineer/modal

A modern, lightweight, customizable **Modal/Dialog library for Angular**.

Built for modern Angular applications with **Standalone Components, Dynamic Components, TypeScript, and a simple service-based API**.

[![npm version](https://img.shields.io/npm/v/@kudoengineer/modal)](https://www.npmjs.com/package/@kudoengineer/modal)
[![npm downloads](https://img.shields.io/npm/dm/@kudoengineer/modal)](https://www.npmjs.com/package/@kudoengineer/modal)
[![license](https://img.shields.io/npm/l/@kudoengineer/modal)](https://github.com/satendra2rajput)
[![Angular](https://img.shields.io/badge/Angular-20%2B-red)](https://angular.dev/)

---

## ✨ Features

- ✅ Angular Standalone Components
- ✅ Modern Angular support
- ✅ TypeScript support
- ✅ Dynamic component rendering
- ✅ Service-based API
- ✅ Promise-based modal result
- ✅ Configurable modal sizes
- ✅ Small, Medium, Large, Extra Large and Full Screen
- ✅ Backdrop click support
- ✅ ESC key support
- ✅ Prevent accidental close
- ✅ Custom width and height
- ✅ Header support
- ✅ Footer support
- ✅ Close button
- ✅ Centered modal
- ✅ Open / Close / Dismiss
- ✅ Data passing to modal component
- ✅ Typed modal result
- ✅ Animation support
- ✅ Tree-shakable
- ✅ No external UI dependency
- ✅ Lightweight and developer friendly

---

# 📦 Installation

Install the package using npm:

```bash
npm install @kudoengineer/modal
```

---

# 🚀 Basic Usage

## 1. Import `KeModalService`

Inject `KeModalService` into your Angular component.

```typescript
import { Component } from '@angular/core';
import { KeModalService } from '@kudoengineer/modal';

@Component({
  selector: 'app-home',
  standalone: true,
  template: ` <button (click)="openModal()">Open Modal</button> `,
})
export class HomeComponent {
  constructor(private readonly modal: KeModalService) {}

  openModal(): void {
    this.modal.open(MyModalComponent, {
      title: 'My Modal',
      size: 'md',
    });
  }
}
```

---

# 🧩 Creating a Modal Component

Create a normal standalone Angular component.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-modal',
  standalone: true,
  template: ` <p>Hello from Modal!</p> `,
})
export class MyModalComponent {}
```

Then open it:

```typescript
this.modal.open(MyModalComponent, {
  title: 'Welcome',
  size: 'md',
});
```

---

# 📐 Modal Sizes

The following sizes are available:

```typescript
type KeModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
```

### Small

```typescript
this.modal.open(MyModalComponent, {
  title: 'Small Modal',
  size: 'sm',
});
```

### Medium

```typescript
this.modal.open(MyModalComponent, {
  title: 'Medium Modal',
  size: 'md',
});
```

### Large

```typescript
this.modal.open(MyModalComponent, {
  title: 'Large Modal',
  size: 'lg',
});
```

### Extra Large

```typescript
this.modal.open(MyModalComponent, {
  title: 'Extra Large Modal',
  size: 'xl',
});
```

### Full Screen

```typescript
this.modal.open(MyModalComponent, {
  title: 'Full Screen Modal',
  size: 'full',
});
```

---

# ⚙️ Modal Configuration

You can customize the modal using `KeModalConfig`.

```typescript
this.modal.open(MyModalComponent, {
  title: 'User Details',

  size: 'lg',

  closeOnBackdrop: true,

  closeOnEscape: true,

  showCloseButton: true,

  showHeader: true,

  showFooter: false,

  centered: true,

  backdrop: true,

  animation: true,

  preventClose: false,
});
```

---

# 📋 Configuration Reference

| Property          | Type                                     | Default     | Description                    |
| ----------------- | ---------------------------------------- | ----------- | ------------------------------ |
| `title`           | `string`                                 | `undefined` | Modal title                    |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`      | Modal size                     |
| `width`           | `string`                                 | `undefined` | Custom modal width             |
| `height`          | `string`                                 | `undefined` | Custom modal height            |
| `closeOnBackdrop` | `boolean`                                | `true`      | Close when backdrop is clicked |
| `closeOnEscape`   | `boolean`                                | `true`      | Close when ESC is pressed      |
| `showCloseButton` | `boolean`                                | `true`      | Show close button              |
| `showHeader`      | `boolean`                                | `true`      | Show modal header              |
| `showFooter`      | `boolean`                                | `false`     | Show modal footer              |
| `centered`        | `boolean`                                | `true`      | Center modal                   |
| `backdrop`        | `boolean`                                | `true`      | Show backdrop                  |
| `animation`       | `boolean`                                | `true`      | Enable animation               |
| `preventClose`    | `boolean`                                | `false`     | Prevent modal closing          |
| `data`            | `unknown`                                | `undefined` | Data passed to modal component |

---

# 🎨 Custom Width

You can define your own modal width.

```typescript
this.modal.open(MyModalComponent, {
  title: 'Custom Width',
  width: '800px',
});
```

You can also use responsive units:

```typescript
this.modal.open(MyModalComponent, {
  title: 'Custom Width',
  width: '80vw',
});
```

---

# 📏 Custom Height

```typescript
this.modal.open(MyModalComponent, {
  title: 'Custom Height',
  height: '500px',
});
```

---

# 🚫 Disable Backdrop Close

If you don't want the modal to close when the user clicks outside:

```typescript
this.modal.open(MyModalComponent, {
  title: 'Important Form',
  closeOnBackdrop: false,
});
```

---

# ⌨️ Disable ESC Close

```typescript
this.modal.open(MyModalComponent, {
  title: 'Important Modal',
  closeOnEscape: false,
});
```

---

# 🔒 Prevent Closing

You can prevent the modal from closing:

```typescript
this.modal.open(MyModalComponent, {
  title: 'Processing',
  preventClose: true,
});
```

This prevents:

- Close button
- Backdrop click
- ESC key

from closing the modal.

---

# ❌ Hide Close Button

```typescript
this.modal.open(MyModalComponent, {
  title: 'Confirmation',
  showCloseButton: false,
});
```

---

# 🧱 Hide Header

```typescript
this.modal.open(MyModalComponent, {
  showHeader: false,
});
```

---

# 🌑 Hide Backdrop

```typescript
this.modal.open(MyModalComponent, {
  backdrop: false,
});
```

---

# 🎬 Disable Animation

```typescript
this.modal.open(MyModalComponent, {
  title: 'No Animation',
  animation: false,
});
```

---

# 📤 Passing Data to Modal

You can pass data while opening the modal.

### Parent Component

```typescript
this.modal.open(UserModalComponent, {
  title: 'User Details',

  data: {
    id: 101,
    name: 'Satendra',
    role: 'Software Engineer',
  },
});
```

### Modal Component

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  template: `
    <h2>{{ data?.name }}</h2>

    <p>User ID: {{ data?.id }}</p>

    <p>Role: {{ data?.role }}</p>
  `,
})
export class UserModalComponent {
  @Input()
  data: any;
}
```

---

# 🔄 Getting Modal Result

`open()` returns a `KeModalRef`.

```typescript
const modalRef = this.modal.open(UserModalComponent, {
  title: 'User Details',
});

modalRef.afterClosed().then((result) => {
  console.log('Modal result:', result);
});
```

---

# ✅ Closing Modal With Result

Inside the modal component:

```typescript
import { Component, inject } from '@angular/core';
import { KeModalRef } from '@kudoengineer/modal';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  template: ` <button (click)="save()">Save</button> `,
})
export class UserModalComponent {
  private readonly modalRef = inject(KeModalRef);

  save(): void {
    this.modalRef.close({
      id: 101,
      name: 'Satendra',
    });
  }
}
```

The parent component receives:

```typescript
const modalRef = this.modal.open(UserModalComponent);

modalRef.afterClosed().then((result) => {
  console.log(result);
});
```

Result:

```typescript
{
  id: 101,
  name: 'Satendra'
}
```

---

# 🚪 Dismiss Modal

If you don't want to return a result:

```typescript
this.modalRef.dismiss();
```

Example:

```typescript
cancel(): void {

  this.modalRef.dismiss();

}
```

Then:

```typescript
modalRef.afterClosed().then((result) => {
  console.log(result);
});
```

Result:

```typescript
undefined;
```

---

# 📝 Complete Form Example

## Parent Component

```typescript
import { Component } from '@angular/core';

import { KeModalService } from '@kudoengineer/modal';

import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  template: ` <button (click)="openUserForm()">Add User</button> `,
})
export class UsersComponent {
  constructor(private readonly modal: KeModalService) {}

  openUserForm(): void {
    const modalRef = this.modal.open(UserFormComponent, {
      title: 'Add User',
      size: 'md',
      closeOnBackdrop: false,
    });

    modalRef.afterClosed().then((result) => {
      if (result) {
        console.log('User created:', result);
      }
    });
  }
}
```

## Modal Component

```typescript
import { Component, inject } from '@angular/core';

import { KeModalRef } from '@kudoengineer/modal';

@Component({
  selector: 'app-user-form',
  standalone: true,
  template: `
    <div>
      <label> Name </label>

      <input #name type="text" placeholder="Enter name" />

      <div>
        <button type="button" (click)="cancel()">Cancel</button>

        <button type="button" (click)="save(name.value)">Save</button>
      </div>
    </div>
  `,
})
export class UserFormComponent {
  private readonly modalRef = inject(KeModalRef);

  save(name: string): void {
    this.modalRef.close({
      name,
    });
  }

  cancel(): void {
    this.modalRef.dismiss();
  }
}
```

---

# 🛠️ Close Modal Programmatically

You can close the currently opened modal:

```typescript
this.modal.close();
```

You can also close with a result:

```typescript
this.modal.close({
  success: true,
});
```

---

# ❌ Close All Modals

```typescript
this.modal.closeAll();
```

---

# 📦 API

## `KeModalService`

### `open()`

```typescript
open<T>(
  component: Type<T>,
  config?: KeModalConfig
): KeModalRef<T>
```

Opens a dynamic component inside a modal.

### `close()`

```typescript
close<T>(
  result?: T
): void
```

Closes the current modal.

### `closeAll()`

```typescript
closeAll(): void
```

Closes all active modals.

---

# 🔗 KeModalRef

## `close()`

```typescript
modalRef.close(result);
```

Closes the modal and returns a result.

## `dismiss()`

```typescript
modalRef.dismiss();
```

Closes the modal without returning a result.

## `afterClosed()`

```typescript
modalRef.afterClosed().then((result) => {
  console.log(result);
});
```

Returns a Promise that resolves when the modal is closed.

---

# 📘 TypeScript Types

## KeModalConfig

```typescript
export interface KeModalConfig {
  title?: string;

  size?: KeModalSize;

  width?: string;

  height?: string;

  closeOnBackdrop?: boolean;

  closeOnEscape?: boolean;

  showCloseButton?: boolean;

  showHeader?: boolean;

  showFooter?: boolean;

  centered?: boolean;

  backdrop?: boolean;

  animation?: boolean;

  preventClose?: boolean;

  data?: unknown;
}
```

## KeModalSize

```typescript
export type KeModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
```

---

# 🌐 Browser Support

This package is designed for modern browsers supported by current Angular versions.

Recommended:

- Chrome
- Edge
- Firefox
- Safari

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

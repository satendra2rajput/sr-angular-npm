# @kudoengineer/toast

A modern, lightweight, customizable Toast Notification library for Angular 22+.

## Features

- ✅ Standalone Components
- ✅ Angular Signals
- ✅ Tree Shakable
- ✅ Multiple Toast Types
- ✅ Queue Support
- ✅ Auto Close
- ✅ Progress Bar
- ✅ Close Button
- ✅ Custom Duration
- ✅ Duplicate Prevention
- ✅ Zero Dependencies
- ✅ Angular 22 Ready

---

## Installation

```bash
npm install @kudoengineer/toast
```

---

## Setup

### app.config.ts

```ts
import { ApplicationConfig } from '@angular/core';
import { provideToast } from '@kudoengineer/toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToast({
      duration: 4000,
      position: 'top-right',
    }),
  ],
};
```

---

## Import Component

```ts
import { Component } from '@angular/core';
import { KeToaster } from '@kudoengineer/toast';

@Component({
  selector: 'app-root',
  imports: [KeToaster],
  template: `
    <button (click)="show()">Show Toast</button>

    <ke-toaster />
  `,
})
export class AppComponent {}
```

---

## Usage

```ts
import { inject } from '@angular/core';
import { ToastService } from '@kudoengineer/toast';

export class AppComponent {
  private toast = inject(ToastService);

  success() {
    this.toast.success('Saved Successfully');
  }

  error() {
    this.toast.error('Something went wrong');
  }

  warning() {
    this.toast.warning('Warning Message');
  }

  info() {
    this.toast.info('Information');
  }
}
```

---

## Configuration

```ts
provideToast({
  duration: 4000,
  max: 5,
  newestOnTop: true,
  queue: true,
  progressBar: true,
  pauseOnHover: true,
  preventDuplicates: false,
  showClose: true,
  position: 'top-right',
});
```

---

## Available Positions

```
top-left
top-center
top-right

bottom-left
bottom-center
bottom-right
```

---

## Toast Types

```ts
toast.success(message);

toast.error(message);

toast.warning(message);

toast.info(message);
```

---

## Component

```html
<ke-toaster />
```

---

## API

### ToastService

| Method     | Description           |
| ---------- | --------------------- |
| success()  | Success Toast         |
| error()    | Error Toast           |
| warning()  | Warning Toast         |
| info()     | Info Toast            |
| clear()    | Remove All Toasts     |
| remove(id) | Remove Specific Toast |

---

## Browser Support

- Chrome
- Edge
- Firefox
- Safari

---

## Angular Compatibility

| Angular | Supported |
| ------- | --------- |
| 22+     | ✅        |

---

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

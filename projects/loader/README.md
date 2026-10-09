# @kudoengineer/loader

A modern, lightweight, customizable loading indicator library for Angular applications.

Built with Angular Standalone Components, Signals, CSS animations, and zero runtime dependencies.

[![npm version](https://img.shields.io/npm/v/@kudoengineer/loader.svg)](https://www.npmjs.com/package/@kudoengineer/loader)
[![npm downloads](https://img.shields.io/npm/dm/@kudoengineer/loader.svg)](https://www.npmjs.com/package/@kudoengineer/loader)
[![license](https://img.shields.io/npm/l/@kudoengineer/loader.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🚀 Angular 20+ support
- 🧩 Standalone Components
- ⚡ Angular Signals
- 🌳 Tree-shakable
- 📦 Zero runtime dependencies
- 🎨 20 built-in loader animations
- 🌈 Custom loader colors
- 🔲 Configurable overlay
- 🎚️ Custom overlay opacity
- 📝 Custom loading text
- 📏 Small, medium, and large sizes
- 📍 Configurable position
- 🔄 Automatic HTTP interceptor support
- ⏭️ Skip loader for individual HTTP requests
- 🔢 Multiple parallel request support
- 🛠️ Manual loader control
- 📱 Responsive
- ♿ Reduced-motion support
- 🎯 TypeScript type-safe API

---

# 📦 Installation

```bash
npm install @kudoengineer/loader
```

---

# 🚀 Quick Start

Import the loader container into your root component.

```ts
import { Component } from '@angular/core';
import { KeLoader } from '@kudoengineer/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KeLoader],
  template: `
    <ke-loader />
    <router-outlet />
  `,
})
export class AppComponent {}
```

The loader container should normally be placed once in your root application component.

---

# 🎯 Manual Loader

The loader can be used without an HTTP interceptor.

```ts
import { Component, inject } from '@angular/core';
import { LoaderService } from '@kudoengineer/loader';

@Component({
  selector: 'app-example',
  template: ` <button (click)="load()">Show Loader</button> `,
})
export class ExampleComponent {
  private readonly loader = inject(LoaderService);

  load(): void {
    this.loader.show({
      type: 'spinner',
      text: 'Loading...',
      color: '#2563eb',
    });

    setTimeout(() => {
      this.loader.hide();
    }, 3000);
  }
}
```

---

# 🎨 Custom Loader Color

The default loader color is:

```text
#2563eb
```

You can customize the color:

```ts
this.loader.show({
  type: 'spinner',
  color: '#7c3aed',
});
```

Green:

```ts
this.loader.show({
  type: 'dots',
  color: '#16a34a',
});
```

Red:

```ts
this.loader.show({
  type: 'pulse',
  color: '#dc2626',
});
```

Any valid CSS color can be used:

```ts
color: '#2563eb';
color: 'rgb(37, 99, 235)';
color: 'rgba(37, 99, 235, 0.8)';
color: 'red';
color: 'var(--primary-color)';
```

---

# 🌈 20 Built-in Loader Types

| #   | Type            | Description                |
| --- | --------------- | -------------------------- |
| 1   | `spinner`       | Classic rotating spinner   |
| 2   | `dots`          | Three animated dots        |
| 3   | `bars`          | Animated vertical bars     |
| 4   | `pulse`         | Pulsing circle             |
| 5   | `ring`          | Rotating ring              |
| 6   | `dual-ring`     | Double ring animation      |
| 7   | `ripple`        | Ripple effect              |
| 8   | `orbit`         | Orbiting dot               |
| 9   | `bounce`        | Bouncing dots              |
| 10  | `wave`          | Wave bars                  |
| 11  | `snake`         | Snake-style animation      |
| 12  | `square`        | Rotating square            |
| 13  | `cube`          | Cube animation             |
| 14  | `dots-wave`     | Animated wave dots         |
| 15  | `progress`      | Indeterminate progress bar |
| 16  | `gradient-ring` | Gradient rotating ring     |
| 17  | `ellipsis`      | Animated ellipsis          |
| 18  | `heartbeat`     | Heartbeat animation        |
| 19  | `stretch`       | Stretching bars            |
| 20  | `solar`         | Solar/orbit animation      |

Example:

```ts
this.loader.show({
  type: 'gradient-ring',
  text: 'Processing...',
});
```

---

# 🔄 HTTP Interceptor

The HTTP interceptor can automatically display the loader for HTTP requests.

Import the interceptor:

```ts
import { loaderInterceptor } from '@kudoengineer/loader';
```

Configure it in `app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { loaderInterceptor } from '@kudoengineer/loader';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([loaderInterceptor]))],
};
```

Now the loader will automatically start when an HTTP request starts and stop when the request completes.

---

# 🌐 Automatic API Loading

Without the interceptor:

```ts
this.loader.show();

this.http.get('/api/users').subscribe({
  next: () => {},
  error: () => {},
  complete: () => {
    this.loader.hide();
  },
});
```

With the interceptor:

```ts
this.http.get('/api/users');
```

The loader is handled automatically.

### Flow

```text
HTTP Request
     ↓
Loader SHOW
     ↓
API Request
     ↓
API Response
     ↓
Loader HIDE
```

---

# ⏭️ Skip Loader for a Specific Request

Sometimes an application should not show a loader for every HTTP request.

Examples:

- Health checks
- Analytics
- Background requests
- Polling
- Silent refresh
- Tracking requests

Use `SKIP_LOADER`.

```ts
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADER } from '@kudoengineer/loader';

this.http.get('/api/health', {
  context: new HttpContext().set(SKIP_LOADER, true),
});
```

This request will execute normally without displaying the loader.

---

# 🔢 Multiple API Requests

The loader supports multiple HTTP requests running at the same time.

Example:

```text
Request A ────────────────✓
Request B ────────────────✓
Request C ─────────────────────✓

Loader
████████████████████████████████
                              ↓
                            HIDE
```

The loader remains visible until all tracked requests are completed.

---

# 🎛️ Loader Options

```ts
this.loader.show({
  type: 'spinner',

  size: 'medium',

  text: 'Loading...',

  fullscreen: true,

  overlay: true,

  overlayOpacity: 0.2,

  showContainer: false,

  position: 'center',

  showCloseButton: false,

  color: '#2563eb',

  duration: 0,
});
```

---

# 📋 Options Reference

| Option            | Type             | Default      | Description              |
| ----------------- | ---------------- | ------------ | ------------------------ |
| `type`            | `LoaderType`     | `spinner`    | Loader animation         |
| `size`            | `LoaderSize`     | `medium`     | Loader size              |
| `text`            | `string`         | `Loading...` | Loading message          |
| `fullscreen`      | `boolean`        | `true`       | Fullscreen loader        |
| `overlay`         | `boolean`        | `true`       | Display overlay          |
| `overlayOpacity`  | `number`         | `0.2`        | Overlay opacity          |
| `showContainer`   | `boolean`        | `false`      | Display loader container |
| `position`        | `LoaderPosition` | `center`     | Loader position          |
| `showCloseButton` | `boolean`        | `false`      | Display close button     |
| `color`           | `string`         | `#2563eb`    | Loader color             |
| `duration`        | `number`         | `0`          | Auto-hide duration       |

---

# 📏 Loader Sizes

Small:

```ts
this.loader.show({
  type: 'spinner',
  size: 'small',
});
```

Medium:

```ts
this.loader.show({
  type: 'spinner',
  size: 'medium',
});
```

Large:

```ts
this.loader.show({
  type: 'spinner',
  size: 'large',
});
```

Available sizes:

```ts
'small' | 'medium' | 'large';
```

---

# 🌫️ Overlay

Enable overlay:

```ts
this.loader.show({
  overlay: true,
  overlayOpacity: 0.2,
});
```

Change opacity:

```ts
overlayOpacity: 0.1;
```

```ts
overlayOpacity: 0.3;
```

```ts
overlayOpacity: 0.5;
```

Disable overlay:

```ts
this.loader.show({
  overlay: false,
});
```

---

# 🪟 Loader Container

Show a container around the loader:

```ts
this.loader.show({
  type: 'spinner',
  showContainer: true,
  text: 'Loading...',
});
```

Without a container:

```ts
this.loader.show({
  type: 'spinner',
  showContainer: false,
});
```

---

# 📝 Loading Text

```ts
this.loader.show({
  type: 'spinner',
  text: 'Fetching users...',
});
```

Upload:

```ts
this.loader.show({
  type: 'progress',
  text: 'Uploading file...',
});
```

Processing:

```ts
this.loader.show({
  type: 'cube',
  text: 'Processing...',
});
```

---

# 🛠️ LoaderService API

## `show()`

Show the default loader:

```ts
this.loader.show();
```

Show with text:

```ts
this.loader.show('Loading...');
```

Show with options:

```ts
this.loader.show({
  type: 'dots',
  color: '#7c3aed',
  text: 'Please wait...',
});
```

---

## `hide()`

Hide the loader:

```ts
this.loader.hide();
```

---

## `startRequest()`

Start a tracked loading request:

```ts
this.loader.startRequest();
```

---

## `endRequest()`

End a tracked loading request:

```ts
this.loader.endRequest();
```

---

## `toggle()`

Toggle the loader:

```ts
this.loader.toggle();
```

---

## `setType()`

Change loader type:

```ts
this.loader.setType('dots');
```

---

## `setSize()`

Change loader size:

```ts
this.loader.setSize('large');
```

---

## `setText()`

Change loading text:

```ts
this.loader.setText('Processing...');
```

---

## `setPosition()`

Change loader position:

```ts
this.loader.setPosition('center');
```

---

## `isLoading()`

Check loader status:

```ts
if (this.loader.isLoading()) {
  console.log('Loader is active');
}
```

---

## `reset()`

Reset loader state:

```ts
this.loader.reset();
```

---

# 📦 TypeScript Types

## LoaderType

```ts
export type LoaderType =
  | 'spinner'
  | 'dots'
  | 'bars'
  | 'pulse'
  | 'ring'
  | 'dual-ring'
  | 'ripple'
  | 'orbit'
  | 'bounce'
  | 'wave'
  | 'snake'
  | 'square'
  | 'cube'
  | 'dots-wave'
  | 'progress'
  | 'gradient-ring'
  | 'ellipsis'
  | 'heartbeat'
  | 'stretch'
  | 'solar';
```

## LoaderSize

```ts
export type LoaderSize = 'small' | 'medium' | 'large';
```

## LoaderPosition

```ts
export type LoaderPosition = 'center' | 'top' | 'bottom';
```

---

# 💡 Recommended Setup

For most Angular applications, use the HTTP interceptor:

```ts
provideHttpClient(withInterceptors([loaderInterceptor]));
```

Then use `SKIP_LOADER` for requests that should not display a loader.

For custom operations such as:

- File processing
- Image processing
- Export
- Import
- Custom async operations

use the manual API:

```ts
this.loader.show({
  type: 'spinner',
  text: 'Processing...',
});
```

Then:

```ts
this.loader.hide();
```

---

# ♿ Accessibility

The loader supports reduced-motion preferences.

Applications that enable:

```css
@media (prefers-reduced-motion: reduce);
```

can reduce or disable animations according to the user's system preference.

---

# 📱 Responsive

Designed to work with:

- Desktop
- Tablet
- Mobile
- Responsive Angular applications

---

# 🌙 Dark Mode

The loader works with light and dark application themes.

You can customize the loader color based on your application theme:

```ts
this.loader.show({
  color: '#60a5fa',
});
```

---

# 🏗️ Built With

- Angular
- TypeScript
- Angular Signals
- Standalone Components
- CSS Animations

No external UI library is required.

---

# 📄 License

MIT License

Copyright (c) 2026 Satendra Rajput

---

# 👨‍💻 Author

**Satendra Rajput**

Software Engineer | Angular Developer | Java Spring Boot

### Website

https://kudoengineer.com

### NPM

https://www.npmjs.com/package/@kudoengineer/loader

---

# 🌐 KudoEngineer

Built and maintained by **KudoEngineer**.

KudoEngineer is a developer-focused learning platform covering:

- Angular
- Java
- Spring Boot
- JavaScript
- TypeScript
- DSA
- System Design
- Interview Preparation
- Developer Roadmaps

Website:

https://kudoengineer.com

---

# ⭐ Support

If you find this package useful:

- ⭐ Star the project
- 📦 Use it in your Angular applications
- 🐛 Report issues
- 💡 Suggest new loader animations
- 🤝 Contribute improvements

---

# 📌 Changelog

## 1.0.0

- Initial public release
- 20 loader animations
- Manual `LoaderService`
- HTTP interceptor
- Request counter
- Request-level loader skipping
- Custom loader colors
- Custom overlay opacity
- Custom loading text
- Multiple loader sizes
- Configurable position
- Responsive design
- Reduced-motion support

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

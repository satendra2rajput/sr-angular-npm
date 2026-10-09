# @kudoengineer/theme

A modern, lightweight and production-ready **theme management library for Angular** with built-in Light, Dark and System theme support.

Designed for modern Angular applications with **Standalone APIs, Signals, TypeScript, SSR-safe APIs and customizable theme configuration**.

## ✨ Features

- 🌞 Light theme
- 🌙 Dark theme
- 🖥️ System theme
- 🔄 Automatic system theme detection
- ⚡ Angular Signals based state
- 💾 Persistent theme preference using `localStorage`
- 🎨 CSS Custom Properties
- 🎯 Customizable theme options
- 🧩 Angular Standalone compatible
- 🛡️ SSR-safe
- 📦 Tree-shakable
- 💪 Fully TypeScript supported
- ♻️ Reset theme support
- 🔁 Toggle Light/Dark mode
- 🎨 Design tokens for colors, typography, spacing, radius and shadows
- 🚀 Lightweight and dependency-friendly
- 🧑‍💻 Developer-friendly API

---

## 📦 Installation

Install the package using npm:

```bash
npm install @kudoengineer/theme
```

Or using yarn:

```bash
yarn add @kudoengineer/theme
```

Or using pnpm:

```bash
pnpm add @kudoengineer/theme
```

---

# 🚀 Quick Start

## 1. Import Theme Provider

In your Angular application's `app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideTheme } from '@kudoengineer/theme';

export const appConfig: ApplicationConfig = {
  providers: [provideTheme()],
};
```

---

## 2. Use ThemeService

Inject `ThemeService` wherever you need theme control.

```ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '@kudoengineer/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <button (click)="toggleTheme()">Toggle Theme</button> `,
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
```

---

# 🎨 Theme Modes

The package supports three modes:

```ts
export type ThemeMode = 'light' | 'dark' | 'system';
```

### Light

```ts
this.themeService.setTheme('light');
```

### Dark

```ts
this.themeService.setTheme('dark');
```

### System

```ts
this.themeService.setSystemTheme();
```

System mode automatically follows the user's operating-system preference.

---

# 🔄 Toggle Theme

Switch between Light and Dark:

```ts
this.themeService.toggle();
```

Example:

```ts
toggleTheme(): void {
  this.themeService.toggle();
}
```

---

# 📖 Get Current Theme

Get the selected theme mode:

```ts
const theme = this.themeService.getTheme();

console.log(theme);
```

Possible values:

```text
light
dark
system
```

---

# 🌗 Check Active Theme

Check whether Dark Mode is active:

```ts
if (this.themeService.isDark()) {
  console.log('Dark mode active');
}
```

Check Light Mode:

```ts
if (this.themeService.isLight()) {
  console.log('Light mode active');
}
```

---

# ⚡ Signals

The package uses Angular Signals for reactive theme state.

```ts
readonly mode = this.themeService.mode;
```

Use it directly in a template:

```html
<p>Current mode: {{ themeService.mode() }}</p>
```

You can also inject the service:

```ts
readonly themeService = inject(ThemeService);
```

Then:

```html
<span> {{ themeService.mode() }} </span>
```

---

# ⚙️ Configuration

You can customize the theme provider.

```ts
import { provideTheme } from '@kudoengineer/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTheme({
      defaultMode: 'system',
      storageKey: 'my-app-theme',
      cssClass: 'my-theme',
      persist: true,
      followSystem: true,
    }),
  ],
};
```

## Available Options

| Option         | Type        | Default    | Description              |
| -------------- | ----------- | ---------- | ------------------------ |
| `defaultMode`  | `ThemeMode` | `system`   | Initial theme mode       |
| `storageKey`   | `string`    | `ke-theme` | localStorage key         |
| `cssClass`     | `string`    | `ke-theme` | CSS class prefix         |
| `persist`      | `boolean`   | `true`     | Persist theme preference |
| `followSystem` | `boolean`   | `true`     | Follow system preference |

---

# 💾 Persistent Theme

By default, the selected theme is stored in `localStorage`.

Default key:

```text
ke-theme
```

For example:

```ts
provideTheme({
  persist: true,
});
```

Disable persistence:

```ts
provideTheme({
  persist: false,
});
```

Custom storage key:

```ts
provideTheme({
  storageKey: 'my-app-theme',
});
```

---

# 🔁 Reset Theme

Reset the theme back to the configured default mode:

```ts
this.themeService.reset();
```

Example:

```ts
resetTheme(): void {
  this.themeService.reset();
}
```

---

# 🎨 CSS Theme Variables

The library provides CSS custom properties that can be used throughout your application.

### Colors

```css
var(--ke-primary)
var(--ke-primary-hover)
var(--ke-primary-active)

var(--ke-secondary)
var(--ke-secondary-hover)
var(--ke-secondary-active)

var(--ke-accent)

var(--ke-background)
var(--ke-surface)
var(--ke-surface-hover)

var(--ke-foreground)

var(--ke-text)
var(--ke-text-muted)
var(--ke-text-disabled)

var(--ke-border)
var(--ke-divider)

var(--ke-success)
var(--ke-warning)
var(--ke-danger)
var(--ke-info)

var(--ke-overlay)
```

Example:

```scss
.card {
  background: var(--ke-surface);
  color: var(--ke-text);
  border: 1px solid var(--ke-border);
}
```

---

# ✍️ Typography Tokens

Available typography variables include:

```css
var(--ke-font-family)

var(--ke-font-size-xs)
var(--ke-font-size-sm)
var(--ke-font-size-md)
var(--ke-font-size-lg)
var(--ke-font-size-xl)
var(--ke-font-size-2xl)
var(--ke-font-size-3xl)
var(--ke-font-size-4xl)

var(--ke-font-weight-regular)
var(--ke-font-weight-medium)
var(--ke-font-weight-semibold)
var(--ke-font-weight-bold)

var(--ke-line-height-tight)
var(--ke-line-height-normal)
var(--ke-line-height-relaxed)
```

Example:

```scss
.heading {
  font-family: var(--ke-font-family);
  font-size: var(--ke-font-size-2xl);
  font-weight: var(--ke-font-weight-bold);
}
```

---

# 📏 Spacing Tokens

```css
var(--ke-space-none)
var(--ke-space-xs)
var(--ke-space-sm)
var(--ke-space-md)
var(--ke-space-lg)
var(--ke-space-xl)
var(--ke-space-xxl)
var(--ke-space-3xl)
var(--ke-space-4xl)
var(--ke-space-5xl)
var(--ke-space-6xl)
var(--ke-space-section)
var(--ke-space-container)
```

Example:

```scss
.container {
  padding: var(--ke-space-lg);
  max-width: var(--ke-space-container);
}
```

---

# 🔲 Border Radius Tokens

```css
var(--ke-radius-none)
var(--ke-radius-xs)
var(--ke-radius-sm)
var(--ke-radius-md)
var(--ke-radius-lg)
var(--ke-radius-xl)
var(--ke-radius-xxl)
var(--ke-radius-full)
```

Example:

```scss
.button {
  border-radius: var(--ke-radius-md);
}
```

---

# 🌫️ Shadow Tokens

```css
var(--ke-shadow-none)
var(--ke-shadow-xs)
var(--ke-shadow-sm)
var(--ke-shadow-md)
var(--ke-shadow-lg)
var(--ke-shadow-xl)
var(--ke-shadow-xxl)
var(--ke-shadow-inner)
```

Example:

```scss
.card {
  box-shadow: var(--ke-shadow-md);
}
```

---

# 🌞 Light Theme

The default Light theme uses:

```css
.ke-theme-light
```

Example:

```scss
.ke-theme-light {
  background: var(--ke-background);
  color: var(--ke-text);
}
```

---

# 🌙 Dark Theme

Dark theme uses:

```css
.ke-theme-dark
```

Example:

```scss
.ke-theme-dark {
  background: var(--ke-background);
  color: var(--ke-text);
}
```

The library automatically applies the correct class to the document root.

---

# 🖥️ System Theme

When using:

```ts
this.themeService.setTheme('system');
```

the library detects:

```css
prefers-color-scheme: dark;
```

and automatically resolves the active theme.

It also listens for system theme changes while System mode is active.

---

# 🎯 Using Theme State in Templates

```ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '@kudoengineer/theme';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  template: `
    <div class="theme-switcher">
      <button (click)="setLight()">☀️ Light</button>

      <button (click)="setDark()">🌙 Dark</button>

      <button (click)="setSystem()">🖥️ System</button>

      <button (click)="toggle()">🔄 Toggle</button>

      <p>
        Current Mode:
        {{ themeService.mode() }}
      </p>
    </div>
  `,
})
export class ThemeSwitcherComponent {
  readonly themeService = inject(ThemeService);

  setLight(): void {
    this.themeService.setTheme('light');
  }

  setDark(): void {
    this.themeService.setTheme('dark');
  }

  setSystem(): void {
    this.themeService.setSystemTheme();
  }

  toggle(): void {
    this.themeService.toggle();
  }
}
```

---

# 🎨 Custom CSS

You can build your application's components using the provided theme variables.

```scss
.dashboard-card {
  background: var(--ke-surface);
  color: var(--ke-text);
  border: 1px solid var(--ke-border);
  border-radius: var(--ke-radius-lg);
  box-shadow: var(--ke-shadow-sm);
  padding: var(--ke-space-lg);
}

.dashboard-card:hover {
  background: var(--ke-surface-hover);
}
```

This allows your UI to automatically adapt between Light and Dark themes.

---

# 🛡️ SSR Support

`@kudoengineer/theme` is designed to be safe for Angular SSR applications.

Browser-specific APIs such as:

- `localStorage`
- `window`
- `matchMedia`
- `document`

are accessed only when running in the browser.

This makes the package suitable for modern Angular applications using SSR.

---

# 📦 Public API

The package exposes the main theme APIs through:

```ts
import { ThemeService, provideTheme } from '@kudoengineer/theme';
```

Theme models:

```ts
import {
  Theme,
  ThemeMode,
  ThemeColors,
  ThemeTypography,
  ThemeSpacing,
  ThemeRadius,
  ThemeShadows,
  ThemeOptions,
} from '@kudoengineer/theme';
```

---

# 🧩 Angular Compatibility

Designed for modern Angular applications.

Recommended:

```text
Angular 22+
TypeScript
Standalone Components
Angular Signals
```

---

# 🏗️ Example Architecture

A typical Angular application can use:

```text
Application
│
├── ThemeService
│   ├── Light
│   ├── Dark
│   └── System
│
├── CSS Variables
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Radius
│   └── Shadows
│
└── Components
    ├── Buttons
    ├── Cards
    ├── Forms
    ├── Tables
    └── Layout
```

All components can consume the same design tokens.

---

# 🚀 Why @kudoengineer/theme?

Building Dark Mode manually often requires:

- Managing localStorage
- Detecting system preferences
- Listening to OS theme changes
- Updating document classes
- Managing CSS variables
- Handling SSR
- Synchronizing application state

`@kudoengineer/theme` provides these capabilities through one simple Angular API.

```ts
provideTheme();
```

and:

```ts
this.themeService.setTheme('dark');
```

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

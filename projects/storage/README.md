# @kudoengineer/storage

A lightweight, type-safe and SSR-safe storage utility for Angular applications.

`@kudoengineer/storage` provides a simple API to work with **LocalStorage, SessionStorage, Cookie Storage, TTL/expiration, prefixes and typed values** in modern Angular applications.

## ✨ Features

- ✅ LocalStorage support
- ✅ SessionStorage support
- ✅ Cookie Storage support
- ✅ Type-safe `get<T>()`
- ✅ Store objects, arrays and primitive values
- ✅ TTL / expiration support
- ✅ Storage key prefix / namespace
- ✅ `has()` support
- ✅ `remove()` support
- ✅ `clear()` support
- ✅ SSR-safe
- ✅ Angular Standalone compatible
- ✅ Tree-shakable
- ✅ Lightweight
- ✅ TypeScript support
- ✅ Angular 20, 21, 22 and 23 compatible

---

## 📦 Installation

Install the package using npm:

```bash
npm install @kudoengineer/storage
```

---

## 🚀 Basic Usage

Import `StorageService`:

```ts
import { Component, inject } from '@angular/core';
import { StorageService } from '@kudoengineer/storage';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `
    <button (click)="saveUser()">Save User</button>
    <button (click)="loadUser()">Load User</button>
    <button (click)="removeUser()">Remove User</button>
  `,
})
export class ExampleComponent {
  private readonly storage = inject(StorageService);

  saveUser(): void {
    this.storage.set('user', {
      id: 101,
      name: 'Satendra',
      role: 'Software Engineer',
    });
  }

  loadUser(): void {
    const user = this.storage.get<{
      id: number;
      name: string;
      role: string;
    }>('user');

    console.log(user);
  }

  removeUser(): void {
    this.storage.remove('user');
  }
}
```

---

# 💾 LocalStorage

LocalStorage is the default storage type.

```ts
this.storage.set('theme', 'dark');
```

Get value:

```ts
const theme = this.storage.get<string>('theme');

console.log(theme);
```

---

# 🗂️ SessionStorage

Use `storage: 'session'` for SessionStorage.

```ts
this.storage.set('token', 'abc123', {
  storage: 'session',
});
```

Get the value:

```ts
const token = this.storage.get<string>('token', {
  storage: 'session',
});
```

---

# 🍪 Cookie Storage

Cookie storage can be used for small values that need cookie-based persistence.

```ts
this.storage.set('language', 'en', {
  storage: 'cookie',
});
```

> Cookie support requires the cookie implementation to be enabled in the package version you are using.

---

# 🔐 Store Objects

You can directly store objects.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 101,
  name: 'Satendra',
  email: 'satendra@example.com',
};

this.storage.set('user', user);
```

Retrieve the object with TypeScript type safety:

```ts
const user = this.storage.get<User>('user');

console.log(user?.name);
```

---

# 📚 Store Arrays

Arrays are also supported.

```ts
const users = [
  {
    id: 1,
    name: 'Satendra',
  },
  {
    id: 2,
    name: 'Rahul',
  },
];

this.storage.set('users', users);
```

Retrieve:

```ts
const users = this.storage.get<User[]>('users');
```

---

# ⏱️ TTL / Expiration

You can automatically expire stored values using `ttl`.

TTL is specified in milliseconds.

### Example: 1 hour

```ts
this.storage.set('token', 'abc123', {
  ttl: 60 * 60 * 1000,
});
```

After the TTL expires, the value is automatically considered expired and removed when accessed.

### Example: 5 minutes

```ts
this.storage.set('otp', '123456', {
  ttl: 5 * 60 * 1000,
});
```

---

# 🏷️ Prefix / Namespace

Use a prefix to organize your storage keys.

```ts
this.storage.set('user', user, {
  prefix: 'kudo',
});
```

The actual storage key becomes:

```text
kudo:user
```

This is useful when multiple applications or modules share the same browser storage.

---

# 🔎 Check if a Key Exists

```ts
const exists = this.storage.has('user');

console.log(exists);
```

With options:

```ts
const exists = this.storage.has('token', {
  storage: 'session',
});
```

---

# 🗑️ Remove Data

Remove a specific key:

```ts
this.storage.remove('user');
```

With SessionStorage:

```ts
this.storage.remove('token', {
  storage: 'session',
});
```

---

# 🧹 Clear Storage

Clear LocalStorage:

```ts
this.storage.clear();
```

Clear SessionStorage:

```ts
this.storage.clear('session');
```

---

# ⚙️ Storage Options

`StorageOptions` supports the following properties:

| Property  | Type                               | Default     | Description                     |
| --------- | ---------------------------------- | ----------- | ------------------------------- |
| `storage` | `'local' \| 'session' \| 'cookie'` | `'local'`   | Storage mechanism               |
| `prefix`  | `string`                           | `undefined` | Storage key namespace           |
| `ttl`     | `number`                           | `undefined` | Expiration time in milliseconds |

Example:

```ts
this.storage.set('user', user, {
  storage: 'local',
  prefix: 'kudo',
  ttl: 60 * 60 * 1000,
});
```

---

# 🧩 API Reference

## `set()`

Store a value.

```ts
set<T>(
  key: string,
  value: T,
  options?: StorageOptions
): void
```

Example:

```ts
this.storage.set('name', 'Satendra');
```

---

## `get()`

Retrieve a stored value.

```ts
get<T>(
  key: string,
  options?: StorageOptions
): T | null
```

Example:

```ts
const name = this.storage.get<string>('name');
```

---

## `has()`

Check whether a key exists.

```ts
has(
  key: string,
  options?: StorageOptions
): boolean
```

---

## `remove()`

Remove a specific key.

```ts
remove(
  key: string,
  options?: StorageOptions
): void
```

---

## `clear()`

Clear selected storage.

```ts
clear(
  type?: StorageType
): void
```

---

# 🛡️ SSR Support

The package is designed to safely handle environments where `window`, `localStorage` or `sessionStorage` are not available.

This makes it suitable for Angular applications using:

- Angular SSR
- Server-side rendering
- Pre-rendering
- Browser applications

Storage operations safely return without throwing browser-only API errors during server execution.

---

# 📘 TypeScript Support

The package supports generic types:

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

this.storage.set<Product>('product', {
  id: 1,
  name: 'Laptop',
  price: 50000,
});

const product = this.storage.get<Product>('product');
```

---

# 🏗️ Recommended Usage

For authentication:

```ts
this.storage.set('access_token', token, {
  storage: 'session',
});
```

For user preferences:

```ts
this.storage.set('theme', 'dark', {
  prefix: 'app',
});
```

For temporary data:

```ts
this.storage.set('otp', '123456', {
  ttl: 5 * 60 * 1000,
});
```

---

# 📦 Angular Compatibility

| Angular    | Supported |
| ---------- | --------- |
| Angular 20 | ✅        |
| Angular 21 | ✅        |
| Angular 22 | ✅        |
| Angular 23 | ✅        |

---

# 🌳 Tree-Shakable

The package is designed to be tree-shakable and uses:

```ts
@Injectable({
  providedIn: 'root'
})
```

Unused code can be removed by modern Angular build tooling.

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

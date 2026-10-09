# @kudoengineer/permission

A lightweight, modern, and developer-friendly **Role-Based Access Control (RBAC) and Permission Management library for Angular**.

`@kudoengineer/permission` makes it easy to manage **permissions, roles, UI access, and protected routes** in Angular applications.

Built with modern Angular, **Standalone APIs, Signals, TypeScript, Directives, Pipes, and Route Guards**.

---

## ✨ Features

- ✅ Permission-based access control
- ✅ Role-based access control (RBAC)
- ✅ Standalone Angular APIs
- ✅ Angular Signals support
- ✅ Permission Service
- ✅ Role Service functionality
- ✅ Structural Permission Directive
- ✅ Structural Role Directive
- ✅ Route Permission Guard
- ✅ Permission Pipe
- ✅ Multiple permission support
- ✅ Multiple role support
- ✅ `has()` permission check
- ✅ `hasAny()` permission check
- ✅ `hasAll()` permission check
- ✅ `hasRole()` role check
- ✅ `hasAnyRole()` role check
- ✅ `hasAllRoles()` role check
- ✅ Dynamic permission updates
- ✅ Dynamic role updates
- ✅ Clear permissions and roles
- ✅ TypeScript-first
- ✅ Tree-shakable
- ✅ No external runtime dependencies
- ✅ Easy integration with JWT/Auth APIs
- ✅ Suitable for enterprise applications

---

# 📦 Installation

Install the package using npm:

```bash
npm install @kudoengineer/permission
```

Or:

```bash
npm i @kudoengineer/permission
```

---

# 🔧 Requirements

This package is designed for modern Angular applications.

Recommended:

- Angular 20+
- TypeScript
- Angular Router

Supported Angular versions:

```text
Angular 20
Angular 21
Angular 22
Angular 23
```

---

# 🚀 Quick Start

## 1. Import PermissionService

Inject `PermissionService` into your application/service/component.

```ts
import { Component } from '@angular/core';
import { PermissionService } from '@kudoengineer/permission';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private permissionService: PermissionService) {
    this.permissionService.setPermissions(['USER_VIEW', 'USER_CREATE', 'USER_EDIT']);

    this.permissionService.setRoles(['ADMIN']);
  }
}
```

---

# 🔐 Permissions

A permission represents a specific action that a user is allowed to perform.

Example permissions:

```text
USER_VIEW
USER_CREATE
USER_EDIT
USER_DELETE

REPORT_VIEW
REPORT_EXPORT

PRODUCT_VIEW
PRODUCT_CREATE
PRODUCT_EDIT
PRODUCT_DELETE
```

You can define permissions according to your application's requirements.

---

# 👤 Roles

A role represents a group of access privileges.

Example:

```text
ADMIN
MANAGER
USER
ACCOUNTANT
SUPPORT
AUDITOR
```

---

# ⚙️ PermissionService

The `PermissionService` is the core API of the package.

```ts
import { PermissionService } from '@kudoengineer/permission';
```

---

## Set Permissions

```ts
this.permissionService.setPermissions(['USER_VIEW', 'USER_CREATE', 'USER_EDIT']);
```

---

## Get Permissions

```ts
const permissions = this.permissionService.getPermissions();

console.log(permissions);
```

---

## Check Permission

Use `has()` when you want to check whether the user has a specific permission.

```ts
const canCreate = this.permissionService.has('USER_CREATE');
```

Returns:

```text
true
```

or:

```text
false
```

---

# 🔀 Multiple Permissions

## `hasAny()`

Returns `true` when the user has at least one of the provided permissions.

```ts
const allowed = this.permissionService.hasAny(['USER_EDIT', 'USER_DELETE']);
```

Example:

```text
USER_EDIT    ❌
USER_DELETE  ✅
```

Result:

```text
true
```

---

## `hasAll()`

Returns `true` only when the user has all provided permissions.

```ts
const allowed = this.permissionService.hasAll(['USER_VIEW', 'USER_EDIT']);
```

Example:

```text
USER_VIEW  ✅
USER_EDIT  ✅
```

Result:

```text
true
```

---

# ➕ Add Permission

You can dynamically add a permission.

```ts
this.permissionService.addPermission('REPORT_EXPORT');
```

---

# ➖ Remove Permission

```ts
this.permissionService.removePermission('REPORT_EXPORT');
```

---

# 👥 Roles

## Set Roles

```ts
this.permissionService.setRoles(['ADMIN', 'MANAGER']);
```

---

## Get Roles

```ts
const roles = this.permissionService.getRoles();

console.log(roles);
```

---

## Check Role

```ts
const isAdmin = this.permissionService.hasRole('ADMIN');
```

---

# 🔀 Multiple Roles

## `hasAnyRole()`

```ts
const allowed = this.permissionService.hasAnyRole(['ADMIN', 'MANAGER']);
```

If the user has either `ADMIN` or `MANAGER`, the result is:

```text
true
```

---

## `hasAllRoles()`

```ts
const allowed = this.permissionService.hasAllRoles(['ADMIN', 'MANAGER']);
```

The user must have both roles.

---

# ➕ Add Role

```ts
this.permissionService.addRole('SUPPORT');
```

---

# ➖ Remove Role

```ts
this.permissionService.removeRole('SUPPORT');
```

---

# 🧹 Clear Access

## Clear Permissions

```ts
this.permissionService.clearPermissions();
```

## Clear Roles

```ts
this.permissionService.clearRoles();
```

## Clear Everything

```ts
this.permissionService.clear();
```

---

# 🎨 Permission Directive

The `kePermission` directive allows you to control UI elements based on permissions.

## Import

```ts
import { PermissionDirective } from '@kudoengineer/permission';

@Component({
  standalone: true,
  imports: [PermissionDirective],
})
export class UserComponent {}
```

---

## Basic Usage

```html
<button *kePermission="'USER_CREATE'">Create User</button>
```

The button will only be rendered if:

```text
USER_CREATE
```

exists in the user's permissions.

---

# 🔀 Multiple Permissions in Directive

You can provide multiple permissions.

```html
<button *kePermission="['USER_EDIT', 'USER_DELETE']">Manage User</button>
```

The element is displayed when the user has **at least one** permission.

---

# 👑 Role Directive

Use `keRole` when access should depend on a role.

## Import

```ts
import { RoleDirective } from '@kudoengineer/permission';

@Component({
  standalone: true,
  imports: [RoleDirective],
})
export class AdminComponent {}
```

---

## Basic Usage

```html
<div *keRole="'ADMIN'">
  <h2>Admin Dashboard</h2>
</div>
```

Only users with:

```text
ADMIN
```

will see the content.

---

# 🔀 Multiple Roles

```html
<div *keRole="['ADMIN', 'MANAGER']">Management Area</div>
```

The content is displayed when the user has at least one of these roles.

---

# 🛡️ Route Protection

Protect Angular routes using `permissionGuard`.

Import:

```ts
import { permissionGuard } from '@kudoengineer/permission';
```

---

## Permission-Based Route

```ts
import { Routes } from '@angular/router';
import { permissionGuard } from '@kudoengineer/permission';

export const routes: Routes = [
  {
    path: 'users',

    canActivate: [permissionGuard],

    data: {
      permissions: ['USER_VIEW'],
    },

    loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent),
  },
];
```

The route will only be accessible when:

```text
USER_VIEW
```

is available.

---

# 👑 Role-Based Route

```ts
{
  path: 'admin',

  canActivate: [
    permissionGuard
  ],

  data: {
    roles: [
      'ADMIN'
    ]
  },

  loadComponent: () =>
    import('./admin/admin.component')
      .then(
        m => m.AdminComponent
      )
}
```

Only users with the `ADMIN` role can access the route.

---

# 🔀 Multiple Permissions in Route

```ts
{
  path: 'reports',

  canActivate: [
    permissionGuard
  ],

  data: {
    permissions: [
      'REPORT_VIEW',
      'REPORT_EXPORT'
    ]
  }
}
```

By default, the guard uses **ANY permission** logic.

So if the user has:

```text
REPORT_VIEW
```

the route is allowed.

---

# 🔒 Require All Permissions

You can require all permissions.

```ts
{
  path: 'secure-report',

  canActivate: [
    permissionGuard
  ],

  data: {
    permissions: [
      'REPORT_VIEW',
      'REPORT_EXPORT'
    ],

    requireAll: true
  }
}
```

The user must have:

```text
REPORT_VIEW ✅
REPORT_EXPORT ✅
```

---

# 🔐 Require All Roles

```ts
{
  path: 'management',

  canActivate: [
    permissionGuard
  ],

  data: {
    roles: [
      'ADMIN',
      'MANAGER'
    ],

    requireAll: true
  }
}
```

---

# 🚫 Forbidden Route

When access is denied, the guard redirects to:

```text
/forbidden
```

Make sure your application has a forbidden page.

Example:

```ts
{
  path: 'forbidden',
  loadComponent: () =>
    import('./forbidden/forbidden.component')
      .then(
        m => m.ForbiddenComponent
      )
}
```

---

# 🧩 Permission Pipe

The package also provides:

```text
kePermission
```

pipe.

Import:

```ts
import { PermissionPipe } from '@kudoengineer/permission';

@Component({
  standalone: true,
  imports: [PermissionPipe],
})
export class DashboardComponent {}
```

---

## Basic Usage

```html
@if ('USER_CREATE' | kePermission) {

<button>Create User</button>

}
```

---

# 🔀 Pipe With Multiple Permissions

```html
@if ( ['USER_EDIT', 'USER_DELETE'] | kePermission ) {

<button>Manage User</button>

}
```

---

# 📡 Signals

The library uses Angular Signals internally.

You can access read-only permission and role signals:

```ts
this.permissionService.permissions$();
```

and:

```ts
this.permissionService.roles$();
```

Example:

```ts
permissions = this.permissionService.permissions$();
```

---

# 🔑 JWT / Authentication Integration

`@kudoengineer/permission` does not handle authentication itself.

Your authentication system can provide the user's roles and permissions.

For example, after login:

```ts
const user = {
  roles: ['ADMIN'],

  permissions: ['USER_VIEW', 'USER_CREATE', 'USER_EDIT', 'USER_DELETE'],
};
```

Set them:

```ts
this.permissionService.setRoles(user.roles);

this.permissionService.setPermissions(user.permissions);
```

---

# 🏦 Example: Banking Application

Example permission model for a banking/fintech application:

```ts
this.permissionService.setRoles(['ADMIN', 'MANAGER']);

this.permissionService.setPermissions([
  'CUSTOMER_VIEW',
  'CUSTOMER_CREATE',
  'CUSTOMER_EDIT',

  'TRANSACTION_VIEW',
  'TRANSACTION_APPROVE',

  'REPORT_VIEW',
  'REPORT_EXPORT',
]);
```

UI:

```html
<button *kePermission="'TRANSACTION_APPROVE'">Approve Transaction</button>
```

Reports:

```html
<button *kePermission="'REPORT_EXPORT'">Export Report</button>
```

Admin:

```html
<section *keRole="'ADMIN'">
  <h2>Administration</h2>
</section>
```

---

# 🧑‍💻 Complete Example

```ts
import { Component } from '@angular/core';

import { PermissionService, PermissionDirective, RoleDirective } from '@kudoengineer/permission';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [PermissionDirective, RoleDirective],

  template: `
    <h1>Dashboard</h1>

    <button *kePermission="'USER_CREATE'">Create User</button>

    <button *kePermission="'USER_EDIT'">Edit User</button>

    <button *kePermission="'USER_DELETE'">Delete User</button>

    <section *keRole="'ADMIN'">
      <h2>Admin Panel</h2>

      <p>Only administrators can see this.</p>
    </section>
  `,
})
export class DashboardComponent {
  constructor(private permissionService: PermissionService) {
    this.permissionService.setRoles(['ADMIN']);

    this.permissionService.setPermissions(['USER_CREATE', 'USER_EDIT']);
  }
}
```

---

# 📚 API Reference

## PermissionService

| Method               | Description                    |
| -------------------- | ------------------------------ |
| `setPermissions()`   | Set user permissions           |
| `getPermissions()`   | Get current permissions        |
| `has()`              | Check one permission           |
| `hasAny()`           | Check if any permission exists |
| `hasAll()`           | Check if all permissions exist |
| `addPermission()`    | Add permission                 |
| `removePermission()` | Remove permission              |
| `clearPermissions()` | Remove all permissions         |
| `setRoles()`         | Set user roles                 |
| `getRoles()`         | Get current roles              |
| `hasRole()`          | Check one role                 |
| `hasAnyRole()`       | Check if any role exists       |
| `hasAllRoles()`      | Check if all roles exist       |
| `addRole()`          | Add role                       |
| `removeRole()`       | Remove role                    |
| `clearRoles()`       | Remove all roles               |
| `clear()`            | Clear roles and permissions    |

---

# 📦 Package Exports

```ts
import {
  Permission,
  Role,
  PermissionConfig,
  PermissionService,
  PermissionDirective,
  RoleDirective,
  permissionGuard,
  PermissionPipe,
} from '@kudoengineer/permission';
```

---

# 🏗️ Architecture

```text
@kudoengineer/permission
│
├── PermissionService
│
├── PermissionDirective
│
├── RoleDirective
│
├── PermissionPipe
│
├── Permission Guard
│
└── Angular Signals
```

---

# 🛡️ Security Note

This library provides **client-side authorization and UI access control**.

It should **not** be treated as the only security layer.

Always enforce authorization on your backend/API.

For example:

```text
Angular
   │
   │ Permission check
   ▼
UI / Route
   │
   ▼
Spring Boot API
   │
   │ Backend authorization
   ▼
Database
```

For sensitive operations such as:

- Money transfer
- Transaction approval
- User deletion
- Password changes
- Financial operations
- Administrative operations

always validate authorization on the server.

---

# 💡 Why @kudoengineer/permission?

Modern Angular applications often need to control:

```text
Who can see this?
Who can access this route?
Who can create?
Who can edit?
Who can delete?
Who can approve?
```

`@kudoengineer/permission` provides a simple API for managing these requirements.

Instead of repeatedly writing:

```ts
if (user.permissions.includes('USER_CREATE')) {
  // ...
}
```

you can use:

```html
<button *kePermission="'USER_CREATE'">Create User</button>
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

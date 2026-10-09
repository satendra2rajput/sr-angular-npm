# @kudoengineer/http

Modern, lightweight and production-ready HTTP client library for Angular.

`@kudoengineer/http` provides a clean and powerful API on top of Angular `HttpClient`, with built-in support for authentication, retry policies, timeout, cancellation, caching, request deduplication, request IDs, logging and Angular Signals.

Built for modern Angular applications and scalable enterprise projects.

---

## ✨ Features

- ✅ Angular Standalone support
- ✅ TypeScript support
- ✅ GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS
- ✅ Base URL configuration
- ✅ Global headers
- ✅ Request-specific headers
- ✅ Query parameters
- ✅ Authentication / Token Provider
- ✅ JWT / Bearer token support
- ✅ URL include/exclude authentication rules
- ✅ Automatic error normalization
- ✅ Retry with exponential backoff
- ✅ Configurable retry status codes
- ✅ Request timeout
- ✅ Request cancellation with `AbortSignal`
- ✅ Request ID generation
- ✅ HTTP request/response logging
- ✅ Cache-first strategy
- ✅ Network-first strategy
- ✅ Force-cache strategy
- ✅ Cache invalidation
- ✅ Request deduplication
- ✅ Angular Signals based HTTP resource
- ✅ Tree-shakable
- ✅ Lightweight
- ✅ Production ready
- ✅ No dependency on `@kudoengineer/loader`

---

# 📦 Installation

Install the package using npm:

```bash
npm install @kudoengineer/http
```

---

# 🔧 Requirements

Supported Angular versions:

- Angular 20
- Angular 21
- Angular 22
- Angular 23

The package requires:

```text
@angular/common
@angular/core
```

---

# 🚀 Basic Setup

## 1. Import providers

In your Angular application, add:

```ts
import { ApplicationConfig } from '@angular/core';

import { provideKudoHttp, provideKudoHttpInterceptors } from '@kudoengineer/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKudoHttp({
      baseUrl: 'https://api.example.com',
    }),

    provideKudoHttpInterceptors(),
  ],
};
```

---

# 🌐 Base URL

Configure a global API base URL:

```ts
provideKudoHttp({
  baseUrl: 'https://api.example.com',
});
```

Now:

```ts
this.http.get('/users');
```

will request:

```text
https://api.example.com/users
```

You can also provide an absolute URL:

```ts
this.http.get('https://another-api.com/users');
```

Absolute URLs are not modified by the configured base URL.

---

# 📡 HTTP Service

Inject `KudoHttpService`:

```ts
import { Component, inject } from '@angular/core';

import { KudoHttpService } from '@kudoengineer/http';

@Component({
  selector: 'app-users',
  standalone: true,
  template: `...`,
})
export class UsersComponent {
  private readonly http = inject(KudoHttpService);
}
```

---

# GET Request

```ts
this.http.get<User[]>('/users').subscribe((users) => {
  console.log(users);
});
```

---

# POST Request

```ts
this.http
  .post<User>('/users', {
    name: 'Satendra',
    email: 'satendra@example.com',
  })
  .subscribe((user) => {
    console.log(user);
  });
```

---

# PUT Request

```ts
this.http
  .put<User>('/users/1', {
    name: 'Satendra Rajput',
  })
  .subscribe((user) => {
    console.log(user);
  });
```

---

# PATCH Request

```ts
this.http
  .patch<User>('/users/1', {
    name: 'Satendra',
  })
  .subscribe((user) => {
    console.log(user);
  });
```

---

# DELETE Request

```ts
this.http.delete('/users/1').subscribe(() => {
  console.log('User deleted');
});
```

---

# HEAD Request

```ts
this.http.head('/users').subscribe((headers) => {
  console.log(headers);
});
```

---

# OPTIONS Request

```ts
this.http.options('/users').subscribe((response) => {
  console.log(response);
});
```

---

# 🧾 Headers

## Global Headers

Configure headers globally:

```ts
provideKudoHttp({
  baseUrl: 'https://api.example.com',

  headers: {
    'Content-Type': 'application/json',
    'X-Client': 'KudoEngineer',
  },
});
```

---

## Request Headers

You can override/add headers for an individual request:

```ts
this.http.get('/users', {
  headers: {
    'X-Request-Type': 'admin',
  },
});
```

---

# 🔎 Query Parameters

Pass query parameters using an object:

```ts
this.http.get('/users', {
  params: {
    page: 1,
    size: 20,
    active: true,
  },
});
```

Generated URL:

```text
/users?page=1&size=20&active=true
```

---

# 🔐 Authentication

`@kudoengineer/http` supports custom token providers.

Create a token provider:

```ts
const tokenProvider = {
  getAccessToken: () => {
    return localStorage.getItem('access_token');
  },
};
```

Configure authentication:

```ts
provideKudoHttpAuth(tokenProvider);
```

Complete configuration:

```ts
import { provideKudoHttpAuth } from '@kudoengineer/http';

providers: [provideKudoHttpAuth(tokenProvider)];
```

The default header is:

```text
Authorization: Bearer <token>
```

---

# 🪪 Custom Authentication Header

```ts
provideKudoHttpAuth(tokenProvider, {
  headerName: 'X-Auth-Token',
  scheme: '',
});
```

---

# 🚫 Exclude URLs from Authentication

```ts
provideKudoHttpAuth(tokenProvider, {
  excludedUrls: ['/auth/login', '/auth/register', '/public'],
});
```

---

# 🎯 Include URLs

You can restrict authentication to specific URLs:

```ts
provideKudoHttpAuth(tokenProvider, {
  includeUrls: ['/api/', '/secure/'],
});
```

---

# 🔄 Retry

Enable global retry:

```ts
provideKudoHttp({
  baseUrl: 'https://api.example.com',

  retry: {
    enabled: true,
    count: 3,
    delay: 500,
    maxDelay: 5000,
  },
});
```

Default retryable status codes:

```text
408
429
500
502
503
504
```

Network errors can also be retried.

---

# 🎯 Request-specific Retry

```ts
this.http.get('/users', {
  retry: {
    enabled: true,
    count: 5,
    delay: 1000,
    maxDelay: 10000,
  },
});
```

Request-level configuration overrides the global retry configuration.

---

# ⏱️ Timeout

Global timeout:

```ts
provideKudoHttp({
  timeout: 30000,
});
```

Request-specific timeout:

```ts
this.http.get('/users', {
  timeout: 10000,
});
```

The value is in milliseconds.

---

# 🛑 Request Cancellation

Use the standard `AbortController` API:

```ts
const controller = new AbortController();

this.http
  .get('/users', {
    signal: controller.signal,
  })
  .subscribe({
    next: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.error(error);
    },
  });
```

Cancel the request:

```ts
controller.abort();
```

---

# ❌ Error Handling

The package normalizes HTTP errors into:

```ts
KudoHttpError;
```

Example:

```ts
this.http.get('/users').subscribe({
  next: (users) => {
    console.log(users);
  },

  error: (error) => {
    console.log(error.status);
    console.log(error.message);
    console.log(error.code);
  },
});
```

Available error codes include:

```text
HTTP_ERROR
NETWORK_ERROR
TIMEOUT
UNKNOWN_ERROR
```

You can also configure a global error handler:

```ts
provideKudoHttp({
  onError: (error) => {
    console.error('[KudoHttp]', error);
  },
});
```

---

# 🆔 Request ID

Request IDs are enabled by default.

Every request receives:

```text
X-Request-ID
```

Example:

```text
X-Request-ID: 9c3d7...
```

This is useful for:

- distributed tracing
- debugging
- backend log correlation
- microservices
- fintech applications

---

# 📝 Logging

Logging is disabled by default.

Enable it:

```ts
provideKudoHttpInterceptors({
  logging: true,
});
```

Example console output:

```text
[KudoHttp] HTTP_REQUEST
[KudoHttp] HTTP_RESPONSE
```

Logging can include:

- request method
- URL
- request ID
- status
- status text
- duration

Sensitive headers and body data are not logged by default.

---

# 💾 Cache

Caching is opt-in per request.

## Cache First

```ts
this.http.get('/users', {
  cache: {
    policy: 'cache-first',
    ttl: 60000,
  },
});
```

The cache is checked first.

If cached data exists, it is returned without making a network request.

---

# 🌐 Network First

```ts
this.http.get('/users', {
  cache: {
    policy: 'network-first',
    ttl: 60000,
  },
});
```

The network is requested first.

If the network request fails and valid cached data exists, cached data is returned.

This is useful for:

- dashboards
- configuration APIs
- offline-friendly applications
- mobile applications

---

# ⚡ Force Cache

```ts
this.http.get('/users', {
  cache: {
    policy: 'force-cache',
    ttl: 60000,
  },
});
```

Cached data is used when available.

---

# 🚫 Disable Cache

```ts
this.http.get('/users', {
  cache: {
    policy: 'no-cache',
  },
});
```

---

# 🗑️ Cache Invalidation

Inject:

```ts
import { KudoCacheService } from '@kudoengineer/http';
```

Then:

```ts
private readonly cache =
  inject(KudoCacheService);
```

Clear all cache:

```ts
this.cache.clear();
```

Invalidate a URL:

```ts
this.cache.invalidate('/users');
```

Check cache:

```ts
this.cache.has('GET:/users');
```

Get cache size:

```ts
this.cache.size();
```

---

# 🔁 Request Deduplication

Request deduplication prevents multiple identical GET requests from being sent simultaneously.

Enable it:

```ts
this.http.get('/users', {
  deduplicate: true,
});
```

If multiple components request:

```ts
this.http.get('/users', {
  deduplicate: true,
});
```

at the same time, the requests can share the same in-flight observable instead of creating unnecessary duplicate network calls.

Deduplication is intended for GET requests.

---

# 📶 Angular Signals HTTP Resource

Modern Angular applications can use the Signals-based HTTP resource API.

Inject:

```ts
import { KudoHttpResourceService } from '@kudoengineer/http';
```

```ts
private readonly resource =
  inject(KudoHttpResourceService);
```

Create a resource:

```ts
usersResource = this.resource.create(() => this.http.get<User[]>('/users'));
```

Execute:

```ts
this.usersResource.execute();
```

---

# 📊 Signals

The resource provides:

```ts
usersResource.data();
```

```ts
usersResource.loading();
```

```ts
usersResource.success();
```

```ts
usersResource.error();
```

```ts
usersResource.status();
```

---

# 🧩 Angular Template Example

```html
@if (usersResource.loading()) {
<p>Loading users...</p>
} @if (usersResource.error()) {
<p>{{ usersResource.error()?.message }}</p>
} @if (usersResource.success()) {
<p>Users loaded successfully.</p>
} @for ( user of usersResource.data() ?? []; track user.id ) {
<p>{{ user.name }}</p>
}
```

---

# 🔄 Reset Resource

```ts
this.usersResource.reset();
```

This resets:

- data
- loading
- success
- error
- status

---

# 🧹 Destroy Resource

```ts
this.usersResource.destroy();
```

This unsubscribes from the active request.

---

# ⚙️ Interceptor Configuration

All built-in interceptors can be configured:

```ts
provideKudoHttpInterceptors({
  auth: true,
  error: true,
  retry: true,
  cache: true,
  logging: false,
  requestId: true,
  deduplication: true,
});
```

---

# 🎛️ Disable Interceptors

For example, disable logging:

```ts
provideKudoHttpInterceptors({
  logging: false,
});
```

Disable retry:

```ts
provideKudoHttpInterceptors({
  retry: false,
});
```

Disable caching:

```ts
provideKudoHttpInterceptors({
  cache: false,
});
```

---

# 🏗️ Recommended Production Setup

```ts
import { ApplicationConfig } from '@angular/core';

import {
  provideKudoHttp,
  provideKudoHttpAuth,
  provideKudoHttpInterceptors,
} from '@kudoengineer/http';

const tokenProvider = {
  getAccessToken: () => {
    return localStorage.getItem('access_token');
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideKudoHttp({
      baseUrl: 'https://api.example.com',

      timeout: 30000,

      retry: {
        enabled: true,
        count: 3,
        delay: 500,
        maxDelay: 5000,
      },

      onError: (error) => {
        console.error('[API Error]', error);
      },
    }),

    provideKudoHttpAuth(tokenProvider, {
      excludedUrls: ['/auth/login', '/auth/register'],
    }),

    provideKudoHttpInterceptors({
      auth: true,
      error: true,
      retry: true,
      cache: true,
      logging: false,
      requestId: true,
      deduplication: true,
    }),
  ],
};
```

---

# 🧱 Architecture

```text
@kudoengineer/http
│
├── core
│   ├── KudoHttpService
│   ├── KudoHttpResource
│   ├── HttpRequest
│   ├── HttpResponse
│   └── HttpError
│
├── config
│   ├── HttpConfig
│   ├── Defaults
│   └── Providers
│
├── auth
│   ├── TokenProvider
│   ├── AuthConfig
│   └── AuthInterceptor
│
├── interceptors
│   ├── Auth
│   ├── Error
│   ├── Retry
│   ├── Cache
│   ├── Logging
│   ├── Request ID
│   └── Deduplication
│
├── cache
│   ├── CacheStore
│   ├── CacheService
│   ├── CacheEntry
│   └── CachePolicy
│
├── retry
│   ├── RetryPolicy
│   ├── Backoff
│   └── RetryContext
│
└── utils
    ├── Headers
    ├── Params
    └── Request ID
```

---

# 📚 API Overview

## `KudoHttpService`

```text
get()
post()
put()
patch()
delete()
head()
options()
```

## `KudoHttpResourceService`

```text
create()
```

## `KudoHttpResource`

```text
data
loading
success
error
status
execute()
reset()
destroy()
```

## `KudoCacheService`

```text
clear()
invalidate()
delete()
has()
size()
keys()
```

## `KudoCacheStore`

```text
get()
set()
delete()
clear()
has()
size()
keys()
deleteByUrl()
```

---

# 🔒 Security Recommendations

For production applications:

- Never log access tokens.
- Never enable body/header logging without reviewing sensitive data.
- Prefer secure token storage appropriate to your application's security model.
- Use HTTPS for production APIs.
- Avoid caching sensitive responses unless explicitly required.
- Configure authentication exclusions carefully.
- Use request IDs for backend traceability.

---

# 🌐 Links

**KudoEngineer**

https://kudoengineer.com

**NPM Package**

https://www.npmjs.com/package/@kudoengineer/http

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

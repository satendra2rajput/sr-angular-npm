# @kudoengineer/seo 🚀

A lightweight, production-ready SEO management library for Angular applications.

`@kudoengineer/seo` provides a clean and developer-friendly API to manage page titles, meta tags, canonical URLs, Open Graph metadata, Twitter/X Cards, JSON-LD structured data, and route-based SEO.

Built for modern Angular applications with a focus on simplicity, performance, and maintainability.

---

## ✨ Features

- 🚀 Simple SEO API
- 🏷️ Dynamic Page Title
- 📝 Meta Description
- 🔑 Meta Keywords
- 🤖 Robots Meta Tag
- 🔗 Canonical URL
- 🌐 HTML Language
- 👤 Author Meta Tag
- 🎨 Theme Color
- 📱 Open Graph Support
- 🐦 Twitter/X Card Support
- 🧩 JSON-LD / Structured Data
- 🛣️ Route-based SEO
- ⚡ Standalone Angular Support
- 🌳 Tree-shakable
- 📦 Zero external runtime dependencies
- 🔄 Dynamic SEO updates
- 🧹 SEO metadata cleanup/reset
- 🧱 TypeScript-first API

---

# 📦 Installation

Install the package using npm:

```bash
npm install @kudoengineer/seo
```

---

# ⚙️ Setup

Add `provideKudoSeo()` to your Angular application configuration.

### `app.config.ts`

```ts
import { ApplicationConfig } from '@angular/core';

import { provideKudoSeo } from '@kudoengineer/seo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKudoSeo({
      title: 'KudoEngineer',
      description: 'Developer platform for Angular and modern web development.',
      robots: 'index, follow',
      language: 'en-IN',
    }),
  ],
};
```

This configuration provides default SEO values for your application.

---

# 🎯 Component-Level SEO

You can configure SEO directly inside an Angular component.

```ts
import { Component, inject } from '@angular/core';

import { SeoService } from '@kudoengineer/seo';

@Component({
  selector: 'app-angular',
  standalone: true,
  template: ` <h1>Angular Roadmap</h1> `,
})
export class AngularComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Angular Roadmap | KudoEngineer',

      description: 'Complete Angular roadmap for developers.',

      keywords: ['Angular', 'TypeScript', 'Angular Roadmap', 'Angular Tutorial'],

      canonical: 'https://kudoengineer.com/angular',

      robots: 'index, follow',

      language: 'en-IN',
    });
  }
}
```

---

# 🛣️ Route-Based SEO

For static pages, route-based SEO is recommended.

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'angular',

    loadComponent: () => import('./angular/angular.component').then((m) => m.AngularComponent),

    data: {
      seo: {
        title: 'Angular Roadmap | KudoEngineer',

        description: 'Complete Angular roadmap for developers.',

        keywords: ['Angular', 'TypeScript', 'Angular Roadmap'],

        canonical: 'https://kudoengineer.com/angular',

        robots: 'index, follow',
      },
    },
  },
];
```

When the route changes, SEO metadata is automatically updated.

---

# 🔗 Canonical URL

Set a canonical URL:

```ts
this.seo.setCanonical('https://kudoengineer.com/angular');
```

Generated HTML:

```html
<link rel="canonical" href="https://kudoengineer.com/angular" />
```

You can also retrieve the current canonical URL:

```ts
const canonical = this.seo.getCanonical();
```

---

# 📱 Open Graph

Configure Open Graph metadata for social sharing.

```ts
this.seo.set({
  title: 'Angular Roadmap | KudoEngineer',

  description: 'Complete Angular roadmap.',

  og: {
    title: 'Angular Roadmap',

    description: 'Complete Angular roadmap.',

    image: 'https://kudoengineer.com/images/angular.png',

    url: 'https://kudoengineer.com/angular',

    type: 'website',

    siteName: 'KudoEngineer',

    locale: 'en_IN',
  },
});
```

Generated metadata:

```html
<meta property="og:title" content="Angular Roadmap" />

<meta property="og:description" content="Complete Angular roadmap." />

<meta property="og:image" content="https://kudoengineer.com/images/angular.png" />

<meta property="og:url" content="https://kudoengineer.com/angular" />

<meta property="og:type" content="website" />

<meta property="og:site_name" content="KudoEngineer" />
```

---

# 🐦 Twitter / X Cards

Configure Twitter/X metadata:

```ts
this.seo.setTwitter({
  card: 'summary_large_image',

  title: 'Angular Roadmap | KudoEngineer',

  description: 'Complete Angular roadmap.',

  image: 'https://kudoengineer.com/images/angular.png',

  site: '@kudoengineer',
});
```

Generated metadata:

```html
<meta name="twitter:card" content="summary_large_image" />

<meta name="twitter:title" content="Angular Roadmap | KudoEngineer" />

<meta name="twitter:description" content="Complete Angular roadmap." />

<meta name="twitter:image" content="https://kudoengineer.com/images/angular.png" />
```

---

# 🧩 JSON-LD / Structured Data

Add structured data to your page:

```ts
this.seo.setJsonLd({
  '@context': 'https://schema.org',

  '@type': 'Article',

  headline: 'Complete Angular Roadmap',

  description: 'Learn Angular from beginner to advanced.',

  author: {
    '@type': 'Person',

    name: 'Satendra Rajput',
  },

  publisher: {
    '@type': 'Organization',

    name: 'KudoEngineer',
  },
});
```

The library generates:

```html
<script type="application/ld+json" data-kudo-seo="true">
  ...
</script>
```

---

# 📚 Multiple JSON-LD Schemas

You can add multiple schemas:

```ts
this.seo.setJsonLdMany([
  {
    '@context': 'https://schema.org',

    '@type': 'Article',

    headline: 'Angular Roadmap',
  },

  {
    '@context': 'https://schema.org',

    '@type': 'BreadcrumbList',

    itemListElement: [],
  },
]);
```

---

# 🏷️ Individual SEO Methods

You don't always need to use the complete `set()` method.

### Title

```ts
this.seo.setTitle('Angular Roadmap');
```

### Description

```ts
this.seo.setDescription('Complete Angular roadmap.');
```

### Keywords

```ts
this.seo.setKeywords(['Angular', 'TypeScript', 'RxJS']);
```

### Robots

```ts
this.seo.setRobots('index, follow');
```

### Author

```ts
this.seo.setAuthor('Satendra Rajput');
```

### Theme Color

```ts
this.seo.setThemeColor('#ffffff');
```

### Language

```ts
this.seo.setLanguage('en-IN');
```

---

# 🔄 Reset SEO

Remove SEO metadata managed by the library:

```ts
this.seo.reset();
```

This removes metadata managed by `@kudoengineer/seo`, including:

- Title
- Description
- Keywords
- Robots
- Author
- Theme Color
- Canonical
- Open Graph
- Twitter/X
- JSON-LD

---

# 🧱 Complete Example

```ts
import { Component, inject } from '@angular/core';

import { SeoService } from '@kudoengineer/seo';

@Component({
  selector: 'app-angular',
  standalone: true,

  template: `
    <main>
      <h1>Angular Roadmap</h1>

      <p>Learn Angular from beginner to advanced.</p>
    </main>
  `,
})
export class AngularComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.set({
      title: 'Angular Roadmap | KudoEngineer',

      description: 'Complete Angular roadmap for developers.',

      keywords: ['Angular', 'Angular Roadmap', 'TypeScript', 'RxJS'],

      canonical: 'https://kudoengineer.com/angular',

      robots: 'index, follow',

      author: 'Satendra Rajput',

      language: 'en-IN',

      og: {
        title: 'Angular Roadmap',

        description: 'Complete Angular roadmap.',

        image: 'https://kudoengineer.com/images/angular.png',

        url: 'https://kudoengineer.com/angular',

        type: 'website',

        siteName: 'KudoEngineer',
      },

      twitter: {
        card: 'summary_large_image',

        title: 'Angular Roadmap',

        description: 'Complete Angular roadmap.',

        image: 'https://kudoengineer.com/images/angular.png',
      },

      jsonLd: {
        '@context': 'https://schema.org',

        '@type': 'Article',

        headline: 'Angular Roadmap',

        author: {
          '@type': 'Person',

          name: 'Satendra Rajput',
        },
      },
    });
  }
}
```

---

# 🎯 SEO Configuration

The main configuration supports:

```ts
interface SeoConfig {
  title?: string;

  description?: string;

  keywords?: string[];

  canonical?: string;

  robots?: string;

  author?: string;

  themeColor?: string;

  language?: string;

  og?: SeoOpenGraph;

  twitter?: SeoTwitter;

  jsonLd?: SeoJsonLd;

  resetMissing?: boolean;
}
```

---

# 🌐 SSR Compatibility

`@kudoengineer/seo` is designed to work with modern Angular applications and server-side rendering architectures.

For SEO-critical applications, Angular SSR is recommended so that crawlers and social platforms can receive the rendered metadata from the server.

---

# ⚡ Performance

The library is designed with a lightweight architecture:

- No heavy third-party runtime dependencies
- Tree-shakable Angular services
- Small focused utilities
- Only requested services are consumed
- Dynamic metadata updates
- TypeScript-first implementation

---

# 🔐 Safe Metadata Management

The package identifies its generated JSON-LD using:

```html
data-kudo-seo="true"
```

This allows the library to clean up its own generated structured-data elements without intentionally removing unrelated JSON-LD scripts created by the application.

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

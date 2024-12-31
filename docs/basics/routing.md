---
title: Routing
layout: page
parent: Basics
nav_order: 1
---

# Routing

When your application receives a request, it calls a controller method to generate the response. The routing
configuration defines which action to run for each incoming URL.

## Defining Routes

Routes can be defined by adding the `@Route` decorator to a controller method. Due to the way decorators work in
TypeScript, you must also add the Controller class to the `controllers` array in the `config/app.ts` file.

```typescript
// src/controller/HomeController.ts
import { type IScope, Route } from '@koala-ts/framework';

export class HomeController {
    @Route({ method: 'GET', path: '/' })
    index(scope: IScope): void {

    }
}

```

```typescript
// src/config/app.ts
import { HomeController } from '../controller/HomeController';
import { type IKoalaConfig } from '@koala-ts/framework';

export const appConfig: IKoalaConfig = {
    controllers: [
        HomeController,
    ]
};
``` 

In the example above, the `index` method of the `HomeController` class will be called when the application receives a
`GET` request to the `/` URL.

## Matching HTTP Methods

The `method` property of the `@Route` decorator can be used to match specific HTTP methods. The value can be a string of
one of the following methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`, `HEAD`, or `ANY`.

## Middleware

You can add multiple middleware functions to a route by passing an array of middleware functions to the `middleware` of
the `@Route` decorator.

```typescript
// src/controller/HomeController.ts
export class HomeController {
    @Route({ method: 'GET', path: '/', middleware: [exampleMiddleware] })
    index(scope: IScope): void {

    }
}
```

Below is an example of a middleware function.

```typescript
// src/middleware/exampleMiddleware.ts
export async function exampleMiddleware(scope: IScope, next: INext): Promise<void> {
    console.log('Example middleware: Before controller');
    await next();
    console.log('Example middleware: After controller');
}
```

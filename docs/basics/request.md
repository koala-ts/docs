---
title: Request
layout: post
parent: Basics
nav_order: 2
---

# Http Request

The `IScope` interface which is passed to the controller method provides access to the incoming request data.

```typescript
import { type IScope, Route } from '@koala-ts/framework';

export class OrderController {
    @Route({ method: 'POST', path: '/users' })
    store(scope: IScope): void {
        const { request } = scope; // Access the request object
    }
}

```

## Interacting with the Request

### Request properties

The `request` object contains information about the incoming request, such as `path`, `host`, and `method`.

```typescript
export class UserController {
    @Route({ method: 'POST', path: '/users' })
    store({ request }: IScope) {
        const { path, host, method } = request;
    }
}
```

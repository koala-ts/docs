---
title: Request
parent: Basics
nav_order: 2
---

# Http Request

The `IScope` interface which is passed to the controller method provides access to the incoming request data.

## Input

### Request body and query parameters

The `request` object provides access to the request `body` and `query` parameters.

```typescript
export class UserController {
    @Route({ method: 'POST', path: '/users' })
    store({ request }: IScope) {
        const { body, query } = request;
    }
}
```

## Request details

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

### Request Parameters

You can access the request parameters using the `params` property.

```typescript
export class UserController {
    @Route({ method: 'GET', path: '/users/:id' })
    show({ request }: IScope) {
        const { params } = request;
        const userId = params.id;
    }
}
```

### Request headers

You can access the request headers using the `headers` property.

```typescript
export class UserController {
    @Route({ method: 'POST', path: '/users' })
    store({ request }: IScope) {
        const { headers } = request;
        const contentType = headers['content-type'];
    }
}
```

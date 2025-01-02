---
title: Response
parent: Basics
nav_order: 3
---

# Http Response

All routes in a controller method should return a response. You can set the response data using the `response` object of
the `IScope` interface.

## Response Body

The response `body` can be `string`, `Buffer`, `Stream`, `Object`, `Array`, `null`, or `undefined`.

```typescript
export class UserController {
    @Route({ method: 'GET', path: '/users/:id' })
    show({ response, params }: IScope) {
        // Find user by id
        const user = findUserById(params.id);

        // Set response body
        response.body = user;
    }
}
```

## Response Status

By default, the response status is `404`. You can set the response status using the `status` property of the `response`

```typescript
export class UserController {
    @Route({ method: 'GET', path: '/users/:id' })
    show({ response, params }: IScope) {
        // Find user by id
        const user = findUserById(params.id);

        // If user not found
        if (!user) {
            response.status = 404;
            response.body = { message: 'User not found' };
            return;
        }

        // This will automatically set the status to 200
        response.body = user;
    }
}
```

Since `response.status` default is set to 404, to send a response without a body and with a different status is to be
done like this:

```typescript
scope.response.status = 204; // Or any other status code
```

If `response.status` has not been set, The status will be set to `200` or `204` depending on `response.body`.
Specifically, if `response.body` has been set as `null` or `undefined`, the status will be set to `204`. Otherwise, it
will be set to `200`.

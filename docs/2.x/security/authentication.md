---
title: Authentication
sidebar_position: 1
---

Authentication in KoalaTs starts at the request boundary. You define which routes are public, which routes require a
user, and how that user is resolved for the request.

## Define The Security Configuration

Keep the firewall rules in one place so the security policy is easy to review.

```ts title="./src/config/security.ts"
import type { SecurityConfig } from '@koala-ts/framework/Security';
import { userProvider } from './user-provider';

export const security: SecurityConfig = {
  firewalls: [
    {
      pattern: '^/login',
      security: false,
    },
    {
      pattern: '^/api',
      security: true,
      provider: userProvider,
    },
  ],
};
```

In that setup:

- `/login` stays public
- routes under `/api` require an authenticated user

If a request matches a protected firewall and no user can be resolved, KoalaTs throws `401 Authentication required`.

## Apply The Firewall

Apply the firewall through `globalMiddleware` so it runs before your route handlers.

```ts title="./src/config/koala.ts"
import type { KoalaConfig } from '@koala-ts/framework';
import { firewall } from '@koala-ts/framework/Security';
import { security } from './security';

export const appConfig: KoalaConfig = {
  globalMiddleware: [firewall(security)],
  routes: [],
};
```

## Resolve The Current User

On protected routes, the firewall can call a `provider` to resolve the current user from the request.

```ts title="./src/config/user-provider.ts"
import type { UserProvider } from '@koala-ts/framework/Security';

export const userProvider: UserProvider = async request => {
  if ('Bearer demo-token' !== request.headers.authorization) {
    return undefined; // reject the request with 401 Authentication required
  }

  return {
    id: 'user-1',
    name: 'John Doe',
    roles: ['ROLE_USER'],
  };
};
```

The provider contract is simple:

- return a user object to authenticate the request
- return `undefined` to reject the request with `401 Authentication required`

When a user is returned, KoalaTs assigns it to `scope.user`.

## Firewall Rule Matching

KoalaTs uses the first matching firewall rule. Order matters, so place specific rules before broader ones.

```ts
firewall({
  firewalls: [
    {
      pattern: '^/api/public',
      security: false,
    },
    {
      pattern: '^/api',
      security: true,
    },
  ],
});
```

In that example, `/api/public/health` stays public because the more specific rule matches first.

Each firewall rule has three parts:

- `pattern`: a regular expression tested against `scope.request.path`
- `security`: whether the matching path requires authentication
- `provider`: an optional async function that resolves a user from the request

## Working With `scope.user`

After the firewall authenticates a request, the resolved user is assigned to `scope.user`.

That lets downstream middleware and route handlers use the current user without repeating token parsing or lookup logic.

## Testing Authenticated Requests

In e2e tests, you can act as a specific user when creating the test agent.

```ts
import { createTestAgent } from '@koala-ts/framework';

const MyUser = {
  identifier: 'user-1',
};

const agent = createTestAgent(appConfig, { actAs: MyUser });
```

Use a plain agent when you want to assert that a protected route returns `401`:

```ts
const anonymousAgent = createTestAgent(appConfig);
```

This gives you two clear test paths:

- unauthenticated requests should be rejected on protected routes
- authenticated requests can be executed with `actAs`

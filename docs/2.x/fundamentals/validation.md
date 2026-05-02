---
title: Validation
sidebar_position: 4
---

Validation is one of the framework's core composition tools. It gives you a consistent way to describe input rules,
run them against request data, and turn failures into a predictable response before your route handler continues.

In practice, validation sits between raw input and application logic. You define rules at the endpoint level, configure
the constraint validators once, and reuse the same validator across the application.

## Core building blocks

The validation system is made of four parts:

- `validationRules`: the rules for a specific payload
- constraint validators: functions such as `notBlank`, `email`, or your own custom constraints
- `createValidator(...)`: builds a reusable `validate(...)` function from a constraint registry
- violations: the result returned when one or more rules fail

Most applications start with one reusable validator:

```typescript
import { builtInConstraints, createValidator } from '@koala-ts/framework/validator';

export const validate = createValidator({
  constraints: builtInConstraints,
});
```

## Validation rules

Validation rules describe what should be checked for each field.

Use the string form for simple rules:

```typescript
const validationRules = {
  email: ['notBlank', 'email'],
  slug: ['slug'],
};
```

Use the object form when a constraint needs options:

```typescript
const validationRules = {
  email: [
    'notBlank',
    {
      email: {
        normalizer: (value: string) => value.trim().toLowerCase(),
      },
    },
  ],
};
```

Rules can also use validation groups:

```typescript
const validationRules = {
  password: [
    {
      notBlank: {
        groups: ['create'],
      },
    },
  ],
};
```

If you call `validate(...)` without groups, the validator uses the `Default` group.

## Constraint validators

Constraint validators are the functions that actually inspect a value and return violations.

You can extend that registry with your own constraints:

```typescript
import { builtInConstraints, createValidator } from '@koala-ts/framework/validator';
import type { ConstraintContext, Violation } from '@koala-ts/framework/validator';

function minLength(value: unknown, context: ConstraintContext): Violation[] {
  const min = context.options.min;

  if (typeof value === 'string' && typeof min === 'number' && value.length < min) {
    return [
      {
        path: context.path,
        constraint: context.constraint,
        message: `Must be at least ${min} characters`,
        value,
      },
    ];
  }

  return [];
}

const validate = createValidator({
  constraints: {
    ...builtInConstraints,
    minLength,
  },
});
```

## Built-in constraints

The built-in constraints are grouped the same way they are grouped in the validator source.

### Basic

#### `notBlank`

Use `notBlank` when a field must not be empty.

It returns a violation for:

- `''`
- `null`
- `undefined`
- `[]`

It supports:

- `message`: override the default message
- `normalizer`: transform string input before checking blankness

```typescript
const validationRules = {
  name: [
    {
      notBlank: {
        normalizer: (value: string) => value.trim(),
      },
    },
  ],
};
```

### String

#### `email`

Use `email` when a field should contain a valid email address.

It:

- accepts valid email strings
- skips `undefined`
- rejects non-string values
- supports `message` and `normalizer`

```typescript
const validationRules = {
  email: [
    {
      email: {
        normalizer: (value: string) => value.trim().toLowerCase(),
      },
    },
  ],
};
```

#### `slug`

Use `slug` when a field should contain a lowercase slug.

It accepts lowercase letters, digits, and single hyphens between segments. It rejects values with spaces,
underscores, uppercase letters, leading or trailing hyphens, or repeated hyphens. Like `email`, it skips
`undefined`, rejects non-string values, and supports `message` and `normalizer`.

```typescript
const validationRules = {
  slug: ['slug'],
};
```

### Other

#### `compound`

Use `compound(...)` when one named constraint should run a nested set of rules against the same value.

This is useful when you want to register a reusable composite rule in the validator configuration and then reference
it by one name in `validationRules`.

```typescript
import { builtInConstraints, compound, createValidator } from '@koala-ts/framework/validator';

const requiredEmail = compound(['notBlank', 'email']);

const validate = createValidator({
  constraints: {
    ...builtInConstraints,
    requiredEmail,
  },
});

const validationRules = {
  userEmail: ['requiredEmail'],
};
```

## Creating and running a validator

`createValidator(...)` returns a reusable `validate(...)` function.

```typescript
const validationRules = {
  email: ['notBlank', 'email'],
};

const violations = validate(
  { email: 'not-an-email' },
  validationRules,
);
```

When you need groups, pass them as the third argument:

```typescript
const violations = validate(
  { password: '' },
  {
    password: [{ notBlank: { groups: ['create'] } }],
  },
  { groups: ['create'] },
);
```

## Interpreting violations

`validate(...)` returns an array of violations. Each violation describes what failed and where it failed.

```typescript
[
  {
    path: 'email',
    constraint: 'email',
    message: 'This value is not a valid email address.',
    value: 'not-an-email',
  },
]
```

That shape is useful when you want full control over formatting, logging, or response handling.

## Validation middleware

If you want request validation in the HTTP pipeline, use `createValidationMiddleware(...)` from
`@koala-ts/framework/validator`.

The recommended pattern is to wire it once and reuse the returned helper:

```typescript
import { createValidationMiddleware } from '@koala-ts/framework/validator';

export const validateBody = createValidationMiddleware({ validate });
```

`validateBody(...)` then accepts route-level `validationRules` and returns a route middleware.

```typescript
import { Route } from '@koala-ts/framework/routing';

const createUserValidationRules = {
  email: ['notBlank', 'email'],
};

Route({
  method: 'POST',
  path: '/users',
  middleware: [validateBody(createUserValidationRules)],
  handler: async scope => {
    scope.response.status = 201;
    scope.response.body = { ok: true };
  },
});
```

This middleware validates `scope.request.body`. When validation fails, it stops the pipeline and returns `400`.

## Complete example

This example shows the full flow: validator setup, middleware creation, and route usage.

```typescript
import { Route } from '@koala-ts/framework/routing';
import type { HttpScope } from '@koala-ts/framework';
import {
  builtInConstraints,
  createValidationMiddleware,
  createValidator,
} from '@koala-ts/framework/validator';

const validate = createValidator({
  constraints: builtInConstraints,
});

const validateBody = createValidationMiddleware({ validate });

const createUserValidationRules = {
  email: ['notBlank', 'email'],
  slug: ['notBlank', 'slug'],
};

export const createUserRoute = Route({
  method: 'POST',
  path: '/users',
  middleware: [validateBody(createUserValidationRules)],
  handler: async ({ response, request }: HttpScope) => {
    response.status = 201;
    response.body = {
      email: request.body.email,
      slug: request.body.slug,
    };
  },
});
```

## Custom `mapViolations`

By default, the middleware flattens violations by field and returns them under `{ errors: ... }`.

```typescript
{
  errors: {
    email: ['This value is not a valid email address.'],
  },
}
```

If your API needs a different field map, provide `mapViolations` when you create the middleware:

```typescript
import { createValidationMiddleware } from '@koala-ts/framework/validator';

const validateBody = createValidationMiddleware({
  validate,
  mapViolations: violations => ({
    form: violations.map(violation => `${violation.path}: ${violation.message}`),
  }),
});
```

The response still keeps the same outer shape:

```typescript
{
  errors: {
    form: ['email: This value is not a valid email address.'],
  },
}
```

## `validationRules` vs configured constraints

These two concepts work together, but they are not the same thing.

- `validationRules` belong to an endpoint or validation call. They say which checks should run for a specific payload.
- `configured constraints` belong to the validator instance created by `createValidator(...)`. They define which
  constraint names exist and how each one validates a value.

For example, this route-level rule:

```typescript
const validationRules = {
  email: ['notBlank', 'email'],
};
```

only works if the validator has matching configured constraints:

```typescript
const validate = createValidator({
  constraints: builtInConstraints,
});
```

If a rule references a constraint that is not registered, validation fails because the validator does not know how to
run it.

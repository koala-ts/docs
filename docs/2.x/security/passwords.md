---
title: Passwords
sidebar_position: 2
---

Password hashing is part of the normal account lifecycle: create a hash when a user registers, verify it during login,
and upgrade it later when your hashing policy changes.

KoalaTs provides `createPasswordHasher(...)` for that flow.

## Create A Password Hasher

Start with the default configuration.

```ts
import { createPasswordHasher } from '@koala-ts/framework/Security';

const passwordHasher = createPasswordHasher();
```

This is the recommended starting point.

The hasher exposes three methods:

- `hash(plainPassword)`
- `verify(hashedPassword, plainPassword)`
- `needsRehash(hashedPassword)`

## Configure It If Needed

If your application has a specific hashing policy, you can pass custom Argon2 options.

```ts title="password-hasher.ts"
import { createPasswordHasher } from '@koala-ts/framework/Security';

export const passwordHasher = createPasswordHasher({
  timeCost: 3,
  memoryCost: 32768,
});
```

Available options include:

- `hashLength`
- `timeCost`
- `memoryCost`
- `parallelism`
- `secret`
- `associatedData`

Use custom values only when you have a reason to tune them. Most applications should start with the defaults.

## Hash Passwords

Use the hasher when storing a new password.

```ts title="user-service.ts"
import { passwordHasher } from 'password-hasher';

const plainPassword = 'my-plain-password';
const hashedPassword = await passwordHasher.hash(plainPassword);
```

Store the returned hash, not the plaintext password.

## Verify Passwords

Use the same hasher during login.

```ts title="auth-service.ts"
import { passwordHasher } from 'password-hasher';

const submittedPassword = 'password-submitted-by-user';
const storedHash = 'argon2id$...'; // retrieved from the database

// check whether the submitted password matches the stored hash
const valid = await passwordHasher.verify(storedHash, submittedPassword);
```

## Rehash Passwords

When your hashing policy changes, an existing hash may still verify successfully while also needing rehashing.

That is what `needsRehash(...)` is for.

```ts
import { passwordHasher } from 'password-hasher';

const storedHash = 'argon2id$...'; // retrieved from the database

// check whether the stored hash needs to be upgraded to match the current policy
const needsUpgrade = passwordHasher.needsRehash(storedHash);
```

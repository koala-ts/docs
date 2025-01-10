---
title: Configuration
nav_order: 1
parent: Getting Started
---

# Configuration

Applications often need to be configured to run in different environments. For example, you might want to use a
different database in development than in production. Configuration is a way to set up your application to run in
different environments.

Thanks to (dotenv)[https://www.npmjs.com/package/dotenv], KoalaTs provides a powerful way to manage your application
configuration.

## Environment files

A fresh KoalaTs application contains a `.env` file in the root of your project. This file contains the default values
needed to run your application. It also comes with a `.env.test` file that contains the default values for your tests.

## Accessing configuration values

You can access configuration values using the `process.env` object. For example, to access the `PORT` value, you can use
the following code:

```typescript
const port = process.env.PORT;
```

## Overriding configuration values

If you need to override an environment value (e.g. to a different value on your local machine), you can do that in a
`.env.local` file:

```
# .env.local
DATABASE_URL="mysql://root:@127.0.0.1:3306/my_database_name"
```

{: .caution}
The `.env.local` file should not be committed to your repository. It is meant to be used for local development only.

Several other .env files are available to set environment variables in just the right situation:

- `.env`: defines the default values of the env vars needed by the application;
- `.env.local`: overrides the default values for all environments but only on the machine which contains the file. This
  file **should not be committed** to the repository and it's ignored in the test environment (because tests should
  produce the same results for everyone);
- `.env.<environment>` (e.g. `.env.test`): overrides env vars only for one environment but for all machines (these files
  are committed);
- `.env.<environment>.local` (e.g. `.env.test.local`): defines machine-specific env var overrides only for one
  environment. It's similar to `.env.local`, but the overrides only apply to one environment.

export const problemPoints = [
  'Service setup becomes hard to trust when routes, middleware, assets, and events are wired in different places.',
  'Request behavior is harder to review when validation and security live outside the path a request actually takes.',
  'Shared helpers drift when each service chooses its own approach to testing, passwords, serialization, or request context.',
  'New contributors move slower when they must learn a local framework shape before changing backend behavior.',
] as const;

export const ideaPoints = [
  'Application configuration declares routes, global middleware, static files, and event subscribers in one place.',
  'Routes, middleware, validators, and subscribers are functions the team can compose and review directly.',
  'Request data, response data, and validation rules stay explicit at the HTTP boundary.',
  'Focused utilities support security, testing, serialization, passwords, static files, and request-scoped state.',
] as const;

export const featureItems = [
  {
    title: 'Application configuration',
    description:
      'Declare routes, global middleware, static files, and event subscribers from the application setup.',
  },
  {
    title: 'Function-first routing',
    description:
      'Define HTTP methods and paths as route functions that keep backend entry points easy to scan.',
  },
  {
    title: 'Request and response primitives',
    description:
      'Work with body, query, parameters, headers, status, response body, and response headers directly.',
  },
  {
    title: 'Validation toolkit',
    description:
      'Use built-in constraints, custom validators, flattened violations, and reusable validation middleware.',
  },
  {
    title: 'Security utilities',
    description:
      'Apply firewall middleware for authenticated routes and use password hashing utilities for credential workflows.',
  },
  {
    title: 'Static files and assets',
    description:
      'Serve public assets from configurable static file settings when a service needs to expose files directly.',
  },
  {
    title: 'Testing support',
    description:
      'Create HTTP test agents from application configuration, including authenticated request scenarios.',
  },
  {
    title: 'Serialization and normalization',
    description:
      'Normalize common response data structures with framework utilities for arrays, records, dates, and null values.',
  },
  {
    title: 'Request-scoped context',
    description:
      'Propagate per-request data across async work when handlers, middleware, subscribers, and shared utilities need the same context.',
  },
] as const;

export const proofItems = [
  {
    value: 'Reviewable',
    label: 'Service setup and request flow stay visible in code',
  },
  {
    value: 'Composable',
    label: 'Routes, middleware, validators, and subscribers are functions',
  },
  {
    value: 'Practical',
    label: 'HTTP, validation, security, testing, static files, and serialization',
  },
] as const;

export const modelSteps = [
  {
    title: 'Start with the application',
    body: 'Use create(...) to declare the service entry points before request handling begins.',
  },
  {
    title: 'Build the request path',
    body: 'Compose routes, middleware, validators, and subscribers as plain pieces in the order the service needs.',
  },
  {
    title: 'Add focused support',
    body: 'Use security, testing, password, serializer, static file, and request-scope utilities without moving behavior out of sight.',
  },
] as const;

export const gettingStartedSteps = [
  {
    title: 'Run the quick start',
    body: 'Generate a new application with `npx @koala-ts/cli create my-app` and inspect the default structure.',
  },
  {
    title: 'Read the framework guide',
    body: 'Review how configuration, routing, validation, request, and response concepts fit together.',
  },
  {
    title: 'Apply it to a service',
    body: 'Register a route, add validation or middleware where needed, and keep the change easy to review.',
  },
] as const;

export const codeTabs = [
  {
    label: 'Application',
    language: 'ts',
    code: `import {create} from '@koala-ts/framework';
import {statusRoute} from './routes';

const app = create({
  routes: [statusRoute],
});

app.listen(3000);`,
  },
  {
    label: 'Routing',
    language: 'ts',
    code: `import {Get} from '@koala-ts/framework/routing';

export const statusRoute = Get('/status', async (scope) => {
  scope.response.body = {status: 'ok'};
});`,
  },
  {
    label: 'Validation',
    language: 'ts',
    code: `import {
  builtInConstraints,
  createValidationMiddleware,
  createValidator,
} from '@koala-ts/framework/validator';

const validate = createValidator({
  constraints: builtInConstraints,
});

const rules = {
  username: ['notBlank'],
  email: ['notBlank', 'email'],
};

const validateBody = createValidationMiddleware({validate});

export const validateUser = validateBody(rules);`,
  },
] as const;

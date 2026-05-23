export const problemPoints = [
  'Application setup starts from one configuration object, so service wiring is visible before request handling begins.',
  'Routes, middleware, validation, static files, and event subscribers are registered through the same service shape.',
  'Security, testing, serialization, password helpers, and request-scoped state stay available as focused framework utilities.',
  'New contributors can inspect the same function-first structure before changing backend behavior.',
] as const;

export const ideaPoints = [
  'Start with application configuration so service setup has one readable entry point.',
  'Compose behavior from functions: routes, middleware, validators, subscribers, and utilities.',
  'Keep request data, response data, and validation rules explicit at the boundary.',
  'Let framework utilities support real backend work without hiding the application flow.',
] as const;

export const featureItems = [
  {
    title: 'Application configuration',
    description:
      'Give each service the same starting point: routes, global middleware, static files, and event subscribers declared in configuration.',
  },
  {
    title: 'Function-first routing',
    description:
      'Define HTTP methods and paths as route functions that keep backend entry points easy to scan and review.',
  },
  {
    title: 'Request and response primitives',
    description:
      'Handle body, query, parameters, headers, status, response body, and response headers through explicit HTTP primitives.',
  },
  {
    title: 'Validation toolkit',
    description:
      'Describe input rules with built-in constraints, custom validators, flattened violations, and reusable validation middleware.',
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
      'Create HTTP test agents from application configuration, including authenticated request scenarios through act-as support.',
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
    value: 'Shape',
    label: 'One application configuration for service setup',
  },
  {
    value: 'Functions',
    label: 'Routes, middleware, validators, and utilities compose explicitly',
  },
  {
    value: 'Coverage',
    label: 'HTTP, validation, security, testing, static files, and serialization',
  },
] as const;

export const modelSteps = [
  {
    title: 'Give the service one shape',
    body: 'Start from create(...) and declare routes, global middleware, static files, and event subscribers in configuration.',
  },
  {
    title: 'Compose behavior as functions',
    body: 'Use function-first routes, middleware, validators, and subscribers so request flow stays visible in code review.',
  },
  {
    title: 'Use utilities where they belong',
    body: 'Add security, testing agents, password helpers, serializers, static files, and request-scoped storage when the service needs them.',
  },
] as const;

export const gettingStartedSteps = [
  {
    title: 'Create the project',
    body: 'Generate a new application with `npx @koala-ts/cli create my-app` and start from the default structure.',
  },
  {
    title: 'Configure and run',
    body: 'Set environment values, review the application configuration, install dependencies, and start the server.',
  },
  {
    title: 'Add backend behavior',
    body: 'Register a function-first route, add validation or middleware where needed, and build from the documented request and response model.',
  },
] as const;

export const architectureCards = [
  {
    title: 'Application setup stays explicit',
    description:
      'Routes, global middleware, static files, and event subscribers are registered through configuration instead of scattered setup code.',
  },
  {
    title: 'Functional composition stays practical',
    description:
      'Routes, middleware, validators, and utilities remain plain pieces that can be composed, reviewed, tested, and refactored.',
  },
  {
    title: 'Framework utilities stay focused',
    description:
      'Validation, security, password hashing, testing, and serialization solve specific service needs without taking over application code.',
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

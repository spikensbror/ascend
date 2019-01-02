# Ascend

A simple and easy to use lightweight inversion of control (IoC) container made
specifically with TypeScript in mind.

What makes Ascend unique is that it is tailor-made for a pure singleton setup.

That means that when you resolve a service via an Ascend resolve, you will always
get the same instance for that specific resolver.

## Why?

A big pitfall of many IoC systems is the fact that transient and singleton state
can easily be mixed up without too much thought.

By not managing transient state, Ascend ensures that the implementor is responsible
for managing.

Unlike many other implementations for JS/TS, there's no need to maintain a set of
"keys" for the services that you register with Ascend. Registration and resolving
is performed simply via the types themselves.

## Install

### NPM

```
npm install ascend reflect-metadata
```

### `reflect-metadata`

* If your project is a library, add `reflect-metadata` to `types` in your `tsconfig.json`.
* If your project is an app, add `import "reflect-metadata";` to your `index.ts`-equivalent.

## Concepts

Below description of the various concepts implemented by Ascend.

### Resolver

The resolver is the main entry point of Ascend. Once you have invoked the `ascend`
bootstrap function, you receive a resolver. From here, you can begin resolving
services for your application:

```typescript
import { ascend } from "ascend";

const resolver = ascend({
  // Specify IOptions parameters here...
});

resolver.resolve(ExampleService).doSomething();
```

For documentation of `IOptions`, see [src/IOptions.ts](src/IOptions.ts).

### Service

Services are the core concept of Ascend. You register services with their respective
implementations with Ascend prior to creating the resolver. Once you receive a
resolver, you can use it to get dependency-injected instances of the registered
services.

A service implementation should be decorated with the `@Implements(...)` decorator:

```typescript
export class ExampleService {
  // ...
}

@Implements(ExampleService)
export class ExampleServiceImpl implements ExampleService {
  // ...
}
```

If you have a self-implementing service, you can use the `@Service` decorator which
is syntactic sugar for the following scenario:

```typescript
@Implements(ExampleService)
export class ExampleService {
  // ...
}
```

### Bootstrapper

A bootstrapper is used by Ascend to provide access to the registrator prior to
creating the resolver. This allows an implementor to register services or
instances manually without having to go through the decorator system.

This is useful for cases where you might want to inject an instance from another
library or application into your application.

A bootstrapper must always implement the `IBootstrapper` interface. If you want
the bootstrapper to be automatically discovered by Ascend, you should also
decorate it with the `@Bootstrapper` decorator.

```typescript
@Bootstrapper
export class ExampleBootstrapper implements IBootstrapper {
  public bootstrap(registrator: Registrator): void {
    // ...
  }
}
```

For documentation on `Registrator`, see [src/Registrator.ts](src/Registrator.ts).

## Example

See the following files for the main entry points of a working implementation.

* [test/integration.spec.ts](test/integration.spec.ts)
* [test/integration/ascender.ts](test/integration/ascender.ts)

From there, you can look at any additionally imported files for more information.

Note: The imports are project-local here, in your project you'd use
`import ... from "ascend"` instead of `import ... from "../../src`.

## Gotchas

### Service identification via interfaces

Due to various restrictions of the current state of TypeScript, you cannot use
interfaces to identify or register services since they are not emitted when
compiled.

Instead, you will have to create a class and use that in place of the interface:

```typescript
export class ExampleService {
  public doSomething(): void {
    throw new Error("Not implemented");
  }
}
```

### Automatic service discovery

Since files are only included when they are required, you will have to re-export all
service implementation types so that they are available in the application and
Ascend can discover them.

This is usually made through an `ascender.ts` imported in your `index.ts`-equivalent:

```typescript
export * from "./something/all";
export * from "./other/all";

export { ascend } from "ascend";
```

A tip here is to use barrel files to reduce the maintenance of your ascender file.

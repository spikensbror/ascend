// The ascender file should export all types that have been decorated to be
// discovered by Ascend. So basically, export all types decorated with
// either `@Service` or `@Bootstrapper`.

// See `integration.spec.ts` for how the ascender is used.

// The `reflect-metadata` polyfill should only be imported once per application
// which means that if you have other libraries dependent on it, should you
// import it outside the ascender file before importing any dependent
// libraries.
import "reflect-metadata";

// Services

export * from "./BootstrappedDependencyServiceImpl";
export * from "./DecoratedDependencyServiceImpl";
export * from "./DecoratedExampleServiceImpl";
export * from "./SimpleDecoratedDependencyService";

// Bootstrappers

export * from "./IntegrationBootstrapper";

// Export

export { ascend } from "../../src";

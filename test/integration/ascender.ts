// The ascender file should import all files containing types that should be
// picked up by Ascend to ensure discovery of decorated classes and
// bootstrappers.

// See `integration.spec.ts` for how the ascender is used.

// NOTE: The reflect-metadata module should never be included by the library
// itself, it should instead be imported by the implementor in the outer
// application. If this import is not performed prior to importing your
// decorated types, services won't register correctly and will receive
// undefined as their dependencies.

// Services

export { BootstrappedDependencyServiceImpl } from "./BootstrappedDependencyServiceImpl";
export { DecoratedDependencyServiceImpl } from "./DecoratedDependencyServiceImpl";
export { DecoratedExampleServiceImpl } from "./DecoratedExampleServiceImpl";
export { SimpleDecoratedDependencyService } from "./SimpleDecoratedDependencyService";

// Bootstrappers

export { IntegrationBootstrapper } from "./IntegrationBootstrapper";

// Export

export { default } from "../../src";

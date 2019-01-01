/* tslint:disable:no-default-export */

import { DefaultOptions } from "./DefaultOptions";
import { DefinitionFactory } from "./DefinitionFactory";
import { DependencyReflector } from "./DependencyReflector";
import { IOptions } from "./IOptions";
import { RegistratorFactory } from "./RegistratorFactory";
import { RegistratorVerifier } from "./RegistratorVerifier";
import { Resolver } from "./Resolver";
import { ResolverFactory } from "./ResolverFactory";

import { bootstrappers } from "./decorators/Bootstrapper";
import { implementations } from "./decorators/Service";

// Decorator exports.
export { Bootstrapper } from "./decorators/Bootstrapper";
export { Service } from "./decorators/Service";

// Type exports.
export { Definition } from "./Definition";
export { IBootstrapper } from "./IBootstrapper";
export { IOptions } from "./IOptions";
export { Registrator } from "./Registrator";
export { Resolver } from "./Resolver";

/**
 * Creates an Ascend resolver with the provided options.
 *
 * @param options The options to apply when creating the resolver.
 */
export function ascend(options: IOptions = new DefaultOptions()): Resolver {
  // Merge provided options into default options.
  options = { ...new DefaultOptions(), ...options };

  const dependencyReflector = new DependencyReflector();
  const registratorVerifier = new RegistratorVerifier(dependencyReflector);
  const definitionFactory = new DefinitionFactory();
  const registratorFactory = new RegistratorFactory(definitionFactory);

  const resolverFactory = new ResolverFactory(dependencyReflector,
                                              registratorVerifier,
                                              registratorFactory,
                                              implementations,
                                              bootstrappers);

  return resolverFactory.create(options);
}

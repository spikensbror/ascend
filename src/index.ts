import { DefaultOptions } from "./DefaultOptions";
import { DependencyReflector } from "./DependencyReflector";
import { IOptions } from "./IOptions";
import { RegistrationFactory } from "./RegistrationFactory";
import { RegistratorFactory } from "./RegistratorFactory";
import { RegistratorVerifier } from "./RegistratorVerifier";
import { Resolver } from "./Resolver";
import { ResolverFactory } from "./ResolverFactory";

import { bootstrappers } from "./decorators/Bootstrapper";
import { implementations } from "./decorators/Implements";

// Decorator exports.
export { all } from "./decorators/all";
export { Bootstrapper } from "./decorators/Bootstrapper";
export { Implements } from "./decorators/Implements";
export { Service } from "./decorators/Service";

// Type exports.
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
  const registrationFactory = new RegistrationFactory();
  const registratorFactory = new RegistratorFactory(registrationFactory);

  const resolverFactory = new ResolverFactory(
    dependencyReflector,
    registratorVerifier,
    registratorFactory,
    implementations,
    bootstrappers
  );

  return resolverFactory.create(options);
}

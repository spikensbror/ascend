/* tslint:disable:no-default-export */

import { DefaultOptions } from "./DefaultOptions";
import { DependencyReflector } from "./DependencyReflector";
import { IOptions } from "./IOptions";
import { RegistratorFactory } from "./RegistratorFactory";
import { RegistratorVerifier } from "./RegistratorVerifier";
import { Resolver } from "./Resolver";
import { ResolverFactory } from "./ResolverFactory";

import { bootstrappers } from "./decorators/Bootstrapper";
import { services } from "./decorators/Service";

// Decorator exports.
export { Bootstrapper } from "./decorators/Bootstrapper";
export { Injectable } from "./decorators/Injectable";
export { Service } from "./decorators/Service";

// Type exports.
export { IBootstrapper } from "./IBootstrapper";
export { Registrator } from "./Registrator";
export { Resolver } from "./Resolver";

export default function ascend(options: IOptions = new DefaultOptions()): Resolver {
  // Merge provided options into default options.
  options = { ...new DefaultOptions(), ...options };

  const dependencyReflector = new DependencyReflector();
  const registratorVerifier = new RegistratorVerifier(dependencyReflector);
  const registratorFactory = new RegistratorFactory();
  const resolverFactory = new ResolverFactory(dependencyReflector,
                                              registratorVerifier,
                                              registratorFactory,
                                              services,
                                              bootstrappers);

  return resolverFactory.create(options);
}

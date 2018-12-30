import { Definition } from "../Definition";
import { Injectable } from "./Injectable";

export const services: Definition[] = [];

export function addService(service: Function, implementation: Function): Definition {
  const definition = new Definition(service, implementation);
  services.push(definition);

  return definition;
}

export function removeService(definition: Definition): void {
  const index = services.indexOf(definition);
  if (index < 0) {
    return;
  }

  services.splice(index, 1);
}

/**
 * Specifies that the decorated type is a service implementation that should be
 * discovered by eligible Ascend resolvers.
 *
 * Note: Ascend resolvers can be configured not to discover decorated service implementors.
 *
 * @param service The service type that the implementation implements or same as the implementation if not specified.
 */
export function Service(service?: Function): (implementation: Function) => void {
  return (implementation: Function): void => {
    Injectable(implementation);

    addService(service || implementation, implementation);
  };
}

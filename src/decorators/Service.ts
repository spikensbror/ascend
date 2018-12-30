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

export function Service(service?: Function): (implementation: Function) => void {
  return (implementation: Function): void => {
    Injectable(implementation);

    addService(service || implementation, implementation);
  };
}

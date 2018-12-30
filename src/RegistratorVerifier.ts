import { DependencyReflector } from "./DependencyReflector";
import { Registrator } from "./Registrator";

export class RegistratorVerifier {
  private readonly dependencyReflector: DependencyReflector;

  public constructor(dependencyReflector: DependencyReflector) {
    this.dependencyReflector = dependencyReflector;
  }

  public verify(registrator: Registrator): void {
    registrator.getDefinitions()
      .forEach((d: any, s: Function) => this.verifyRegistration(registrator, s));
  }

  private verifyRegistration(registrator: Registrator, service: Function, parent?: Function): void {
    const definition = registrator.getDefinitions().get(service);
    if (definition === undefined) {
      throw new Error("Service '" + parent + "' depends on '" + service + "' which has not been registered.");
    }

    // If instance has already been constructed, we won't have to worry about
    // dependencies.
    if (definition.instance !== undefined) {
      return;
    }

    this.dependencyReflector.getDependencies(definition.implementation)
      .forEach((s: Function) => this.verifyRegistration(registrator, s, service));
  }
}

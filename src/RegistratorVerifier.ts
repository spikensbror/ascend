import { DependencyReflector } from "./DependencyReflector";
import { Registrator } from "./Registrator";

export class RegistratorVerifier {
  private readonly dependencyReflector: DependencyReflector;

  public constructor(dependencyReflector: DependencyReflector) {
    this.dependencyReflector = dependencyReflector;
  }

  public verify(registrator: Registrator): void {
    registrator.getRegistrations().forEach((r: any, s: Function) => {
      this.verifyRegistration(registrator, s);
    });
  }

  private verifyRegistration(
    registrator: Registrator,
    service: Function,
    parent?: Function
  ): void {
    const registration = registrator.getRegistrations().get(service);
    if (registration === undefined) {
      throw new Error(
        "Service '" +
          parent +
          "' depends on '" +
          service +
          "' which has not been registered."
      );
    }

    // If instance has already been constructed, we won't have to worry about
    // dependencies.
    if (registration.instance !== undefined) {
      return;
    }

    this.dependencyReflector
      .getDependencies(registration.implementation)
      .forEach((s: Function) => {
        this.verifyRegistration(registrator, s, service);
      });
  }
}

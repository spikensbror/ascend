import { DependencyReflector } from "./DependencyReflector";
import { Registration } from "./Registration";
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
    const registrations = registrator.getRegistrations().get(service);
    if (registrations === undefined) {
      throw new Error(
        "Service '" +
          parent +
          "' depends on '" +
          service +
          "' which has not been registered."
      );
    }

    registrations.forEach((registration: Registration) => {
      // If instance has already been constructed, we won't have to worry about
      // dependencies.
      if (registration.instance !== undefined) {
        return;
      }

      this.dependencyReflector
        .getDependencies(registration.implementation)
        .forEach((d: Function, i: number) => {
          this.verifyDependency(registrator, registration, d, i);
        });
    });
  }

  private verifyDependency(
    registrator: Registrator,
    registration: Registration,
    dependency: Function,
    parameterIndex: number
  ): void {
    const allDecoratorType = this.dependencyReflector.getAllDecoratorType(
      registration.implementation,
      parameterIndex
    );

    if (allDecoratorType !== undefined) {
      this.verifyRegistration(
        registrator,
        allDecoratorType,
        registration.service
      );
    } else {
      this.verifyRegistration(registrator, dependency, registration.service);
    }
  }
}

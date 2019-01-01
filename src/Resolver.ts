import { Constructor } from "./Constructor";
import { DependencyReflector } from "./DependencyReflector";
import { Registration } from "./Registration";

/**
 * Resolves services.
 */
export class Resolver {
  private readonly dependencyReflector: DependencyReflector;
  private readonly registrations: Map<Function, Registration>;

  /**
   * Creates a new service resolver.
   */
  public constructor(
    dependencyReflector: DependencyReflector,
    registrations: Map<Function, Registration>
  ) {
    this.dependencyReflector = dependencyReflector;
    this.registrations = registrations;
  }

  /**
   * Resolves the specified service.
   *
   * @param service The service type to resolve.
   * @returns The resolved service instance.
   */
  public resolve<T>(service: Constructor<T>): T {
    const definition = this.registrations.get(service);

    // Make sure that the service has been registered.
    if (definition === undefined) {
      throw new Error("Service has not been registered: " + service);
    }

    this.tryCreateInstance(definition);

    return (definition.instance as any) as T;
  }

  /**
   * Get service registration count for the resolver.
   *
   * @returns How many services are registered for the resolver.
   */
  public getRegistrationCount(): number {
    return this.registrations.size;
  }

  private tryCreateInstance(registration: Registration): void {
    // If there already is an instance stored on the definition, we simply
    // return as we want everything to be singleton.
    if (registration.instance !== undefined) {
      return;
    }

    // We grab the implementation as `any` because otherwise we're not allowed
    // to do `new` with it.
    const implementation: any = registration.implementation;
    const args: any[] = [];
    const dependencies = this.getDependencies(implementation);

    dependencies.forEach((d: Function) => args.push(this.resolve(d)));

    registration.instance = new implementation(...args);
  }

  private getDependencies(implementation: Function): Function[] {
    return this.dependencyReflector.getDependencies(implementation);
  }
}

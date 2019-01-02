import { Constructor } from "./Constructor";
import { DependencyReflector } from "./DependencyReflector";
import { Registration } from "./Registration";

/**
 * Resolves services.
 */
export class Resolver {
  private readonly dependencyReflector: DependencyReflector;
  private readonly registrations: Map<Function, Registration[]>;

  /**
   * Creates a new service resolver.
   */
  public constructor(
    dependencyReflector: DependencyReflector,
    registrations: Map<Function, Registration[]>
  ) {
    this.dependencyReflector = dependencyReflector;
    this.registrations = registrations;

    this.registrations.set(Resolver, [
      new Registration(Resolver, Resolver, this)
    ]);
  }

  /**
   * Resolves the specified service.
   *
   * @param service The service type to resolve.
   * @returns The resolved service instance.
   */
  public resolve<T>(service: Constructor<T>): T {
    const registration = this.getRegistrations(service)[0];

    this.tryCreateInstance(registration);

    return (registration.instance as any) as T;
  }

  public resolveMany<T>(service: Constructor<T>): T[] {
    const registrations = this.getRegistrations(service);

    return registrations.map((registration: Registration) => {
      this.tryCreateInstance(registration);

      return (registration.instance as any) as T;
    });
  }

  /**
   * Get service registration count for the resolver.
   *
   * @returns How many services are registered for the resolver.
   */
  public getRegistrationCount(): number {
    return this.registrations.size;
  }

  private getRegistrations(service: Function): Registration[] {
    const registrations = this.registrations.get(service);

    // Make sure that the service has been registered.
    if (registrations === undefined) {
      throw new Error("Service has not been registered: " + service);
    }

    return registrations;
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

    dependencies.forEach((d: Function, i: number) => {
      args.push(this.resolveDependency(registration, d, i));
    });

    registration.instance = new implementation(...args);
  }

  private resolveDependency(
    registration: Registration,
    dependency: Function,
    parameterIndex: number
  ): any {
    return (
      this.resolveAllDecoratorDependency(registration, parameterIndex) ||
      this.resolve(dependency)
    );
  }

  private resolveAllDecoratorDependency(
    registration: Registration,
    parameterIndex: number
  ): object[] | undefined {
    const type = this.dependencyReflector.getAllDecoratorType(
      registration.implementation,
      parameterIndex
    );

    return type && this.resolveMany(type);
  }

  private getDependencies(implementation: Function): Function[] {
    return this.dependencyReflector.getDependencies(implementation);
  }
}

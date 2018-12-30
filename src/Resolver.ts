import { Constructor } from "./Constructor";
import { Definition } from "./Definition";
import { DependencyReflector } from "./DependencyReflector";

/**
 * Resolves services.
 */
export class Resolver {
  private readonly dependencyReflector: DependencyReflector;
  private readonly definitions: Map<Function, Definition>;

  /**
   * Creates a new service resolver.
   */
  public constructor(dependencyReflector: DependencyReflector,
                     definitions: Map<Function, Definition>,
  ) {
    this.dependencyReflector = dependencyReflector;
    this.definitions = definitions;
  }

  /**
   * Resolves the specified service.
   *
   * @param service The service type to resolve.
   * @returns The resolved service instance.
   */
  public resolve<T>(service: Constructor<T>): T {
    const definition = this.definitions.get(service);

    // Make sure that the service has been registered.
    if (definition === undefined) {
      throw new Error("Service has not been registered: " + service);
    }

    this.tryCreateInstance(definition);

    return definition.instance as any as T;
  }

  /**
   * Get service registration count for the resolver.
   *
   * @returns How many services are registered for the resolver.
   */
  public getDefinitionCount(): number {
    return this.definitions.size;
  }

  private tryCreateInstance(definition: Definition): void {
    // If there already is an instance stored on the definition, we simply
    // return as we want everything to be singleton.
    if (definition.instance !== undefined) {
      return;
    }

    // We grab the implementation as `any` because otherwise we're not allowed
    // to do `new` with it.
    const implementation: any = definition.implementation;
    const args: any[] = [];
    const dependencies = this.getDependencies(implementation);

    dependencies.forEach((d: Function) => {
      args.push(this.resolve(d));
    });

    definition.instance = new implementation(...args);
  }

  private getDependencies(implementation: Function): Function[] {
    return this.dependencyReflector.getDependencies(implementation);
  }
}

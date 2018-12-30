import { Definition } from "./Definition";

/**
 * Registers services for a resolver.
 */
export class Registrator {
  private readonly definitions: Map<Function, Definition>;

  /**
   * Creates a new service registrator.
   */
  public constructor() {
    this.definitions = new Map<Function, Definition>();
  }

  /**
   * Registers a service that should be managed by the resolver.
   *
   * @param service The service type to register.
   * @param implementation The service implementation type, same as `service` if undefined.
   */
  public register(service: Function, implementation?: Function): void {
    this.registerDefinition(new Definition(service, implementation || service));
  }

  /**
   * Registers a service with an already existing instance.
   *
   * @param service The service type to register.
   * @param instance The instance of the service.
   */
  public registerInstance(service: Function, instance: object): void {
    this.registerDefinition(new Definition(service, service, instance));
  }

  /**
   * Registers a pre-made service registration.
   *
   * @param definition The service registration to register.
   */
  public registerDefinition(definition: Definition): void {
    this.definitions.set(definition.service, definition);
  }

  /**
   * Get all service registrations performed by the registrator.
   *
   * @returns The service registrations performed by the registrator.
   */
  public getDefinitions(): Map<Function, Definition> {
    return this.definitions;
  }
}

import { Constructor } from "./Constructor";
import { Definition } from "./Definition";
import { DefinitionFactory } from "./DefinitionFactory";

/**
 * Registers services for a resolver.
 */
export class Registrator {
  private readonly definitionFactory: DefinitionFactory;
  private readonly definitions: Map<Function, Definition>;

  /**
   * Creates a new service registrator.
   */
  public constructor(definitionFactory: DefinitionFactory) {
    this.definitionFactory = definitionFactory;
    this.definitions = new Map<Function, Definition>();
  }

  /**
   * Registers a service implementation that should be managed by the resolver.
   *
   * @param service The service type to register.
   * @param implementation The service implementation type, same as `service` if undefined.
   */
  public register(implementation: Function): void {
    this.registerDefinition(this.definitionFactory.create(implementation));
  }

  /**
   * Registers a service with an already existing instance.
   *
   * @param service The service type to register.
   * @param instance The instance of the service.
   */
  public registerInstance<T extends object>(service: Constructor<T>, instance: T): void {
    this.registerDefinition(new Definition(service, service, instance));
  }

  /**
   * Get all service registrations performed by the registrator.
   *
   * @returns The service registrations performed by the registrator.
   */
  public getDefinitions(): Map<Function, Definition> {
    return this.definitions;
  }

  /**
   * Registers a pre-made service registration.
   *
   * @param definition The service registration to register.
   */
  private registerDefinition(definition: Definition): void {
    this.definitions.set(definition.service, definition);
  }
}

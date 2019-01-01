import { Constructor } from "./Constructor";
import { Registration } from "./Registration";
import { RegistrationFactory } from "./RegistrationFactory";

/**
 * Registers services for a resolver.
 */
export class Registrator {
  private readonly registrationFactory: RegistrationFactory;
  private readonly registrations: Map<Function, Registration>;

  /**
   * Creates a new service registrator.
   */
  public constructor(registrationFactory: RegistrationFactory) {
    this.registrationFactory = registrationFactory;
    this.registrations = new Map<Function, Registration>();
  }

  /**
   * Registers a service implementation that should be managed by the resolver.
   *
   * @param service The service type to register.
   * @param implementation The service implementation type, same as `service` if undefined.
   */
  public register(implementation: Function): void {
    this.setRegistration(this.registrationFactory.create(implementation));
  }

  /**
   * Registers a service with an already existing instance.
   *
   * @param service The service type to register.
   * @param instance The instance of the service.
   */
  public registerInstance<T extends object>(
    service: Constructor<T>,
    instance: T
  ): void {
    this.setRegistration(new Registration(service, service, instance));
  }

  /**
   * Get all service registrations performed by the registrator.
   *
   * @returns The service registrations performed by the registrator.
   */
  public getRegistrations(): Map<Function, Registration> {
    return this.registrations;
  }

  /**
   * Registers a pre-made service registration.
   *
   * @param definition The service registration to register.
   */
  private setRegistration(registration: Registration): void {
    this.registrations.set(registration.service, registration);
  }
}

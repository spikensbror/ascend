/**
 * A service registration.
 */
export class Definition {
  /**
   * The service type to implement.
   */
  public readonly service: Function;

  /**
   * The implementation type of the service.
   */
  public readonly implementation: Function;

  /**
   * The instance of the service.
   */
  public instance?: object;

  /**
   * Creates a new service registration.
   *
   * @param service The service type to implement.
   * @param implementation The implementation type of the service.
   * @param instance The instance of the service.
   */
  public constructor(service: Function,
                     implementation: Function,
                     instance?: object,
  ) {
    this.service = service;
    this.implementation = implementation;
    this.instance = instance;
  }
}

import { Registrator } from "./Registrator";

/**
 * Defines a bootstrapper, used to register services for a resolver.
 */
export interface IBootstrapper {
  /**
   * Invoked when performing registrations for a resolver.
   *
   * @param registrator The registrator to use for service registration.
   */
  bootstrap(registrator: Registrator): void;
}

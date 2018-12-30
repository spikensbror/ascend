import { Definition } from "./Definition";
import { IBootstrapper } from "./IBootstrapper";

/**
 * Defines options for `Resolver` creation.
 */
export interface IOptions {
  /**
   * Specifies if service types decorated with `@Service` should be registered
   * with the resolver.
   */
  discoverDecoratedServices?: boolean;

  /**
   * Specifies if bootstrapper types decorated with `@Bootstrapper` should
   * be invoked for registration of services before creating the resolver.
   */
  discoverDecoratedBootstrappers?: boolean;

  /**
   * Specifies the services that should be registered with the resolver.
   */
  services?: Definition[];

  /**
   * Specifies the bootstrappers that should be invoked for registration of
   * services before creating the resolver.
   */
  bootstrappers?: IBootstrapper[];
}

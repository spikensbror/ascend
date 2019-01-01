import { IBootstrapper } from "./IBootstrapper";

/**
 * Defines options for resolver creation.
 */
export interface IOptions {
  /**
   * Specifies if service implementation types decorated with `@Service` or
   * `@Implements` should automatically be registered with the resolver.
   */
  discoverDecoratedImplementations?: boolean;

  /**
   * Specifies if bootstrapper types decorated with `@Bootstrapper` should
   * automatically be invoked for the resolver.
   */
  discoverDecoratedBootstrappers?: boolean;

  /**
   * Specifies the service implementation types that should be registered with
   * the resolver.
   */
  implementations?: Function[];

  /**
   * Specifies the bootstrappers that should be invoked for registration of
   * services before creating the resolver.
   */
  bootstrappers?: IBootstrapper[];
}

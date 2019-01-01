import { DependencyReflector } from "./DependencyReflector";
import { IBootstrapper } from "./IBootstrapper";
import { IOptions } from "./IOptions";
import { Registrator } from "./Registrator";
import { RegistratorFactory } from "./RegistratorFactory";
import { RegistratorVerifier } from "./RegistratorVerifier";
import { Resolver } from "./Resolver";

export class ResolverFactory {
  private readonly dependencyReflector: DependencyReflector;
  private readonly registratorVerifier: RegistratorVerifier;
  private readonly registratorFactory: RegistratorFactory;

  private readonly implementations: Function[];
  private readonly bootstrappers: IBootstrapper[];

  public constructor(dependencyReflector: DependencyReflector,
                     registratorVerifier: RegistratorVerifier,
                     registratorFactory: RegistratorFactory,
                     implementations: Function[],
                     bootstrappers: IBootstrapper[],
  ) {
    this.dependencyReflector = dependencyReflector;
    this.registratorVerifier = registratorVerifier;
    this.registratorFactory = registratorFactory;
    this.implementations = implementations;
    this.bootstrappers = bootstrappers;
  }

  public create(options: IOptions): Resolver {
    const registrator = this.registratorFactory.create();

    this.registerServices(registrator, options);
    this.registerBootstrappers(registrator, options);

    this.registratorVerifier.verify(registrator);

    return new Resolver(this.dependencyReflector, registrator.getRegistrations());
  }

  private registerServices(registrator: Registrator, options: IOptions): void {
    if (options.implementations) {
      options.implementations.forEach((i: Function) => registrator.register(i));
    }

    if (!options.discoverDecoratedImplementations) {
      return;
    }

    this.implementations.forEach((i: Function) => registrator.register(i));
  }

  private registerBootstrappers(registrator: Registrator, options: IOptions): void {
    if (options.bootstrappers) {
      options.bootstrappers.forEach((b: IBootstrapper) => b.bootstrap(registrator));
    }

    if (!options.discoverDecoratedBootstrappers) {
      return;
    }

    this.bootstrappers.forEach((b: IBootstrapper) => b.bootstrap(registrator));
  }
}

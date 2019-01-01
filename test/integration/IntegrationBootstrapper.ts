import { Bootstrapper, IBootstrapper, Registrator } from "../../src";

import { BootstrappedDependencyService } from "./shared";

import { BootstrappedDependencyServiceImpl } from "./BootstrappedDependencyServiceImpl";

@Bootstrapper
export class IntegrationBootstrapper implements IBootstrapper {
  public bootstrap(registrator: Registrator): void {
    const instance = new BootstrappedDependencyServiceImpl("C");

    registrator.registerInstance(BootstrappedDependencyService, instance);
  }
}

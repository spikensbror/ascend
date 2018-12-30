import { Definition } from "./Definition";
import { IBootstrapper } from "./IBootstrapper";
import { IOptions } from "./IOptions";

export class DefaultOptions implements IOptions {
  public discoverDecoratedServices: boolean = true;
  public discoverDecoratedBootstrappers: boolean = true;

  public services: Definition[] = [];
  public bootstrappers: IBootstrapper[] = [];
}

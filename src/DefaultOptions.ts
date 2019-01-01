import { IBootstrapper } from "./IBootstrapper";
import { IOptions } from "./IOptions";

export class DefaultOptions implements IOptions {
  public discoverDecoratedImplementations: boolean = true;
  public discoverDecoratedBootstrappers: boolean = true;

  public implementations: Function[] = [];
  public bootstrappers: IBootstrapper[] = [];
}

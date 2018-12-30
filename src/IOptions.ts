import { Definition } from "./Definition";
import { IBootstrapper } from "./IBootstrapper";

export interface IOptions {
  discoverDecoratedServices?: boolean;
  discoverDecoratedBootstrappers?: boolean;

  services?: Definition[];
  bootstrappers?: IBootstrapper[];
}

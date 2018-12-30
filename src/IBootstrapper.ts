import { Registrator } from "./Registrator";

export interface IBootstrapper {
  bootstrap(registrator: Registrator): void;
}

import { Registrator } from "./Registrator";

export class RegistratorFactory {
  public create(): Registrator {
    return new Registrator();
  }
}

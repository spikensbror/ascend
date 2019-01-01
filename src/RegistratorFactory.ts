import { RegistrationFactory } from "./RegistrationFactory";
import { Registrator } from "./Registrator";

export class RegistratorFactory {
  private readonly registrationFactory: RegistrationFactory;

  public constructor(registrationFactory: RegistrationFactory) {
    this.registrationFactory = registrationFactory;
  }

  public create(): Registrator {
    return new Registrator(this.registrationFactory);
  }
}

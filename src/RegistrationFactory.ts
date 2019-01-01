import { Registration } from "./Registration";

export class RegistrationFactory {
  public create(implementation: Function): Registration {
    if (!Reflect.hasOwnMetadata("ascend:injectable", implementation)) {
      throw new Error(
        "Implementation of type '" +
          implementation +
          "' is not injectable. Please make sure that is has been decorated."
      );
    }

    const service = Reflect.getOwnMetadata("ascend:implements", implementation);

    return new Registration(service, implementation);
  }
}

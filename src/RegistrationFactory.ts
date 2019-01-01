import { NotInjectableError } from "./NotInjectableError";
import { Registration } from "./Registration";

export class RegistrationFactory {
  public create(implementation: Function): Registration {
    if (!Reflect.hasOwnMetadata("ascend:injectable", implementation)) {
      throw new NotInjectableError(implementation);
    }

    const service = Reflect.getOwnMetadata("ascend:implements", implementation);

    return new Registration(service, implementation);
  }
}

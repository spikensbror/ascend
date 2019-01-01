import { Definition } from "./Definition";

export class DefinitionFactory {
  public create(implementation: Function): Definition {
    if (!Reflect.hasOwnMetadata("ascend:injectable", implementation)) {
      throw new Error("Implementation of type '" +
                      implementation +
                      "' has not been decorated with `@Service`.");
    }

    const service = Reflect.getOwnMetadata("ascend:implements", implementation);

    return new Definition(service, implementation);
  }
}

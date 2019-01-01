import { NotInjectableError } from "./NotInjectableError";

export class DependencyReflector {
  public getDependencies(implementation: Function): Function[] {
    if (!Reflect.hasOwnMetadata("ascend:injectable", implementation)) {
      throw new NotInjectableError(implementation);
    }

    return Reflect.getOwnMetadata("design:paramtypes", implementation) || [];
  }
}

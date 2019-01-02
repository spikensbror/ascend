import { NotInjectableError } from "./NotInjectableError";

export class DependencyReflector {
  public getDependencies(implementation: Function): Function[] {
    if (!Reflect.hasOwnMetadata("ascend:injectable", implementation)) {
      throw new NotInjectableError(implementation);
    }

    return Reflect.getOwnMetadata("design:paramtypes", implementation) || [];
  }

  public getAllDecoratorType(
    implementation: Function,
    parameterIndex: number
  ): Function | undefined {
    return Reflect.getOwnMetadata(
      "ascend:multi:" + parameterIndex,
      implementation
    );
  }
}

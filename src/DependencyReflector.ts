export class DependencyReflector {
  public getDependencies(implementation: Function): Function[] {
    if (!Reflect.hasOwnMetadata("ascend:injectable", implementation)) {
      throw new Error(
        "Implementation type '" +
          implementation +
          "' is not injectable. Please make sure that it has been decorated."
      );
    }

    return Reflect.getOwnMetadata("design:paramtypes", implementation) || [];
  }
}

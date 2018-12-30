import "reflect-metadata";

export class DependencyReflector {
  public getDependencies(implementation: Function): Function[] {
    if (!Reflect.hasOwnMetadata("ascend:injectable", implementation)) {
      throw new Error("Implementation type '" +
                      implementation +
                    "' has not been decorated with `@Service` or `@Injectable`.");
    }

    return Reflect.getOwnMetadata("design:paramtypes", implementation) || [];
  }
}

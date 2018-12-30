/* tslint:disable:max-classes-per-file */

export class DecoratedExampleService {
  public getA(): string {
    throw new Error("Not implemented");
  }
}

export class DecoratedDependencyService {
  public getB(): string {
    throw new Error("Not implemented");
  }
}

export class BootstrappedDependencyService {
  public getC(): string {
    throw new Error("Not implemented");
  }
}

export class NotRegisteredService {
  //
}

export function GenerateMetadata(target: any): void {
  //
}

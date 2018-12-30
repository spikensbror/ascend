import { Definition } from "./Definition";

export class Registrator {
  private readonly definitions: Map<Function, Definition>;

  public constructor() {
    this.definitions = new Map<Function, Definition>();
  }

  public register(service: Function, implementation?: Function): void {
    this.registerDefinition(new Definition(service, implementation || service));
  }

  public registerInstance(service: Function, instance: object): void {
    this.registerDefinition(new Definition(service, service, instance));
  }

  public registerDefinition(definition: Definition): void {
    this.definitions.set(definition.service, definition);
  }

  public getDefinitions(): Map<Function, Definition> {
    return this.definitions;
  }
}

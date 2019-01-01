import { DefinitionFactory } from "./DefinitionFactory";
import { Registrator } from "./Registrator";

export class RegistratorFactory {
  private readonly definitionFactory: DefinitionFactory;

  public constructor(definitionFactory: DefinitionFactory) {
    this.definitionFactory = definitionFactory;
  }

  public create(): Registrator {
    return new Registrator(this.definitionFactory);
  }
}

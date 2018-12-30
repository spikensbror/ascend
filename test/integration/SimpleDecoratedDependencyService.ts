import { Service } from "../../src";

@Service()
export class SimpleDecoratedDependencyService {
  public getD(): string {
    return "D";
  }
}

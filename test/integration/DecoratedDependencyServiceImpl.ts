import { Service } from "../../src";

import { DecoratedDependencyService } from "../integration-shared";

@Service(DecoratedDependencyService)
export class DecoratedDependencyServiceImpl implements DecoratedDependencyService {
  public getB(): string {
    return "B";
  }
}

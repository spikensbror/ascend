import { Implements } from "../../src";

import { DecoratedDependencyService } from "./shared";

@Implements(DecoratedDependencyService)
export class DecoratedDependencyServiceImpl implements DecoratedDependencyService {
  public getB(): string {
    return "B";
  }
}

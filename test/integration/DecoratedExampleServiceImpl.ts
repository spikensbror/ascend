import { Implements } from "../../src";

import {
  DecoratedDependencyService,
  DecoratedExampleService,
} from "./shared";

import { SimpleDecoratedDependencyService } from "./SimpleDecoratedDependencyService";

@Implements(DecoratedExampleService)
export class DecoratedExampleServiceImpl implements DecoratedExampleService {
  private readonly decorated: DecoratedDependencyService;
  private readonly simple: SimpleDecoratedDependencyService;

  public constructor(decorated: DecoratedDependencyService,
                     simple: SimpleDecoratedDependencyService,
  ) {
    this.decorated = decorated;
    this.simple = simple;
  }

  public getA(): string {
    return "A" +
      this.decorated.getB() +
      this.simple.getD();
  }
}

import { Service } from "../../src";

import {
  BootstrappedDependencyService,
  DecoratedDependencyService,
  DecoratedExampleService,
} from "./shared";

import { SimpleDecoratedDependencyService } from "./SimpleDecoratedDependencyService";

@Service(DecoratedExampleService)
export class DecoratedExampleServiceImpl implements DecoratedExampleService {
  private readonly decorated: DecoratedDependencyService;
  private readonly bootstrapped: BootstrappedDependencyService;
  private readonly simple: SimpleDecoratedDependencyService;

  public constructor(decorated: DecoratedDependencyService,
                     bootstrapped: BootstrappedDependencyService,
                     simple: SimpleDecoratedDependencyService,
  ) {
    this.decorated = decorated;
    this.bootstrapped = bootstrapped;
    this.simple = simple;
  }

  public getA(): string {
    return "A" +
      this.decorated.getB() +
      this.bootstrapped.getC() +
      this.simple.getD();
  }
}

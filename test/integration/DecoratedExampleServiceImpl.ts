import { all, Implements } from "../../src";

import { DecoratedDependencyService, DecoratedExampleService } from "./shared";

import { MultiDecoratedDependencyService } from "./MultiDecoratedDependencyService";
import { SimpleDecoratedDependencyService } from "./SimpleDecoratedDependencyService";

@Implements(DecoratedExampleService)
export class DecoratedExampleServiceImpl implements DecoratedExampleService {
  public readonly decorated: DecoratedDependencyService;
  public readonly simple: SimpleDecoratedDependencyService;
  public readonly multiple: MultiDecoratedDependencyService[];

  public constructor(
    decorated: DecoratedDependencyService,
    simple: SimpleDecoratedDependencyService,
    @all(MultiDecoratedDependencyService) multiple: []
  ) {
    this.decorated = decorated;
    this.simple = simple;
    this.multiple = multiple;
  }

  public getA(): string {
    return "Hello";
  }
}

/* tslint:disable:max-classes-per-file */

import { Implements } from "../../src";

export class MultiDecoratedDependencyService {
  //
}

@Implements(MultiDecoratedDependencyService)
export class MultiDecoratedDependencyServiceImpl1
  implements MultiDecoratedDependencyService {
  //
}

@Implements(MultiDecoratedDependencyService)
export class MultiDecoratedDependencyServiceImpl2
  implements MultiDecoratedDependencyService {
  //
}

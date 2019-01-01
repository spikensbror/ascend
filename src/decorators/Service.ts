import { Implements } from "./Implements";

/**
 * Specifies that the decorated type is a self-implementing service.
 *
 * @param implementation The self-implementing service type.
 */
export function Service(implementation: Function): void {
  Implements(implementation)(implementation);
}

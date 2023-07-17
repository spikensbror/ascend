/**
 * Specifies that the decorated parameter takes all implementations of the
 * specified service type.
 *
 * @param service The service type to inject all implementations of.
 */
export function all(
  service: Function
): (i: Function, pk: string | symbol | undefined, pi: number) => void {
  return (i: Function, pk: string | symbol | undefined, pi: number): void => {
    Reflect.defineMetadata("ascend:multi:" + pi, service, i);
  };
}

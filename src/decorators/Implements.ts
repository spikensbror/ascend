export const implementations: Function[] = [];

/**
 * Specifies that the decorated type implements the specified service.
 *
 * @param service The service type that the implementation implements or same as the implementation if not specified.
 */
export function Implements(service: Function): (implementation: Function) => void {
  return (implementation: Function): void => {
    Reflect.defineMetadata("ascend:injectable", true, implementation);
    Reflect.defineMetadata("ascend:implements", service, implementation);

    implementations.push(implementation);
  };
}

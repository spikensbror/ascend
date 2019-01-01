export const implementations: Function[] = [];

// TODO: Rename to Injectable instead?

/**
 * Specifies that the decorated type is a service implementation.
 *
 * @param service The service type that the implementation implements or same as the implementation if not specified.
 */
export function Service(service?: Function): (implementation: Function) => void {
  return (implementation: Function): void => {
    Reflect.defineMetadata("ascend:injectable", true, implementation);
    Reflect.defineMetadata("ascend:implements", service || implementation, implementation);

    implementations.push(implementation);
  };
}

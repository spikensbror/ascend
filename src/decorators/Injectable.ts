/**
 * Specifies that the decorated type is injectable which means it can be resolved
 * or injected as a dependency by an Ascend resolver.
 *
 * Note: Not needed if the type has been decorated with `@Service` already.
 *
 * @param target The injectable type.
 */
export function Injectable(target: any): void {
  Reflect.defineMetadata("ascend:injectable", true, target);
}

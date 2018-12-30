import { EmptyConstructor } from "../Constructor";
import { IBootstrapper } from "../IBootstrapper";

export const bootstrappers: IBootstrapper[] = [];

/**
 * Specifies that the decorated type is a bootstrapper that should be discovered
 * by eligible Ascend resolvers.
 *
 * Note: Ascend resolvers can be configured not to discover decorated bootstrappers.
 *
 * @param target The bootstrapper type.
 */
export function Bootstrapper(target: EmptyConstructor<IBootstrapper>): void {
  bootstrappers.push(new target());
}

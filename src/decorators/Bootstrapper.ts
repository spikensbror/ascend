import { Constructor } from "../Constructor";
import { IBootstrapper } from "../IBootstrapper";

export const bootstrappers: IBootstrapper[] = [];

export function Bootstrapper(target: Constructor<IBootstrapper>): void {
  const constructor: any = target;

  bootstrappers.push(new constructor());
}

export function Injectable(target: any): void {
  Reflect.defineMetadata("ascend:injectable", true, target);
}

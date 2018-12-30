/* tslint:disable:callable-types */

// TSLint is hung up on { new(): T } for some reason.

export type Constructor<T> = Function & { prototype: T };
export type EmptyConstructor<T> = { new(): T } & Constructor<T>;

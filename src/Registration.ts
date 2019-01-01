export class Registration {
  public readonly service: Function;
  public readonly implementation: Function;

  public instance?: object;

  public constructor(service: Function,
                     implementation: Function,
                     instance?: object,
  ) {
    this.service = service;
    this.implementation = implementation;
    this.instance = instance;
  }
}

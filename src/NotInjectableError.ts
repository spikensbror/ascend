export class NotInjectableError extends Error {
  public constructor(type: Function) {
    super(
      "Type '" +
        type +
        "' is not injectable. Please make sure that it has been decorated."
    );
  }
}

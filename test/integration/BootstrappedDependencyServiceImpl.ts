import { BootstrappedDependencyService } from "./shared";

export class BootstrappedDependencyServiceImpl implements BootstrappedDependencyService {
  private readonly letter: string;

  public constructor(letter: string) {
    this.letter = letter;
  }

  public getC(): string {
    return this.letter;
  }
}

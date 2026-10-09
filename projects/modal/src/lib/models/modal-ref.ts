export class KeModalRef<T = unknown> {
  private closed = false;

  private readonly closedPromise: Promise<T | undefined>;

  private resolveClosed!: (result?: T) => void;

  constructor(
    private readonly closeCallback: (result?: T) => void,
    private readonly dismissCallback: () => void,
  ) {
    this.closedPromise = new Promise<T | undefined>((resolve) => {
      this.resolveClosed = resolve;
    });
  }

  close(result?: T): void {
    if (this.closed) {
      return;
    }

    this.closed = true;

    this.closeCallback(result);
    this.resolveClosed(result);
  }

  dismiss(): void {
    if (this.closed) {
      return;
    }

    this.closed = true;

    this.dismissCallback();
    this.resolveClosed(undefined);
  }

  afterClosed(): Promise<T | undefined> {
    return this.closedPromise;
  }
}

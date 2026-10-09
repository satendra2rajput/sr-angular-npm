export class Timer {
  private timeoutId?: ReturnType<typeof setTimeout>;

  private startTime = 0;

  private remaining: number;

  constructor(
    private readonly duration: number,
    private readonly callback: () => void,
  ) {
    this.remaining = duration;
  }

  start(): void {
    this.startTime = Date.now();

    this.timeoutId = setTimeout(() => {
      this.callback();
    }, this.remaining);
  }

  pause(): void {
    if (!this.timeoutId) {
      return;
    }

    clearTimeout(this.timeoutId);

    this.remaining -= Date.now() - this.startTime;
  }

  resume(): void {
    if (this.remaining <= 0) {
      this.callback();
      return;
    }

    this.start();
  }

  stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

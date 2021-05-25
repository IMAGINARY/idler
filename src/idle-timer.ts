interface Idle {
  interrupt(): void;
  getIdleTime(): number;
}

const dummyTimeoutId = setTimeout(() => {}, 0);

export default class IdleTimer {
  protected idle: Idle;

  protected repeat: boolean;

  protected func: (...args: unknown[]) => void;

  protected timeoutDelay: number;

  protected args: unknown[];

  protected timeoutId: ReturnType<typeof setTimeout> = dummyTimeoutId;

  protected testTimeoutCb: () => void;

  constructor(
    idle: Idle,
    repeat: boolean,
    func: (...args: unknown[]) => void,
    timeoutDelay: number,
    ...args: unknown[]
  ) {
    this.idle = idle;
    this.repeat = repeat;
    this.func = func;
    this.timeoutDelay = timeoutDelay;
    this.args = args;
    this.testTimeoutCb = () => this.testTimeout();
    this.testTimeout();
  }

  reset(): void {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.testTimeoutCb, this.timeoutDelay);
  }

  clear(): void {
    clearTimeout(this.timeoutId);
  }

  protected testTimeout(): void {
    const idleTime = this.idle.getIdleTime();
    if (idleTime >= this.timeoutDelay) {
      if (this.repeat) this.reset();
      this.func(...this.args);
    } else {
      const idleTimeRemaining = this.timeoutDelay - idleTime;
      this.timeoutId = setTimeout(this.testTimeoutCb, idleTimeRemaining);
    }
  }
}

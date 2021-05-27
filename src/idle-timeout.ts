import { Callback } from './util';

const dummyTimeoutId = setTimeout(() => {}, 0);

interface Idler {
  interrupt(): void;

  getIdleTime(): number;

  on(eventType: string, callback: Callback): this;

  off(eventType: string, callback: Callback): this;

  once(eventType: string, callback: Callback): this;
}

export default class IdleTimeout {
  protected idler: Idler;

  protected beginCb: Callback;

  protected endCb: Callback;

  protected delay: number;

  protected duration: number;

  protected timeoutId: ReturnType<typeof setTimeout>;

  protected durationTimeoutId: ReturnType<typeof setTimeout>;

  protected endHandler = this.handleEnd.bind(this);

  private initialized = false;

  private idle = false;

  constructor(
    idler: Idler,
    beginCb: Callback,
    delay: number,
    duration: number,
    endCb: Callback
  ) {
    this.idler = idler;
    this.beginCb = beginCb;
    this.delay = delay;
    this.duration = duration;
    this.endCb = typeof endCb === 'undefined' ? () => {} : endCb;
    this.timeoutId = dummyTimeoutId;
    this.durationTimeoutId = dummyTimeoutId;
    this.init();
  }

  init(): void {
    if (!this.initialized) {
      this.initialized = true;
      this.idle = false;
      this.timeoutId = setTimeout(() => this.testTimeout(), 0);
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  clear(): void {
    if (this.initialized) {
      clearTimeout(this.timeoutId);
      if (this.isIdle()) this.handleEnd();
      this.initialized = false;
    }
  }

  isIdle(): boolean {
    return this.idle;
  }

  protected testTimeout(): void {
    if (this.isInitialized()) {
      const idleTime = this.idler.getIdleTime();
      if (idleTime >= this.delay) {
        this.handleBegin();
      } else {
        const idleTimeRemaining = this.delay - idleTime;
        this.timeoutId = setTimeout(
          () => this.testTimeout(),
          idleTimeRemaining
        );
      }
    }
  }

  protected handleBegin(): void {
    this.idle = true;
    this.idler.on('interrupted', this.endHandler);
    this.beginCb();
    if (Number.isFinite(this.duration) && this.duration >= 0)
      this.durationTimeoutId = setTimeout(
        () => this.handleEnd(),
        this.duration
      );
  }

  protected handleEnd(): void {
    clearTimeout(this.durationTimeoutId);
    this.idler.off('interrupted', this.endHandler);
    this.idle = false;
    this.endCb();
    this.testTimeout();
  }
}

export { IdleTimeout };

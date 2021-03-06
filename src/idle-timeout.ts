import { Idler } from './idler-types';
import { Callback, dayInMs } from './util';

const dummyTimeoutId = setTimeout(() => {}, dayInMs);

export default class IdleTimeout {
  protected idler: Idler;

  protected beginCb: Callback;

  protected endCb: Callback;

  protected delay: number;

  protected duration: number;

  protected timeoutId: ReturnType<typeof setTimeout>;

  protected durationTimeoutId: ReturnType<typeof setTimeout>;

  private interruptHandler = this.interrupt.bind(this);

  private interruptHandlerInternal = () => {};

  private initialized = false;

  private idle = false;

  protected startIdle: boolean;

  constructor(
    idler: Idler,
    beginCb: Callback,
    delay: number,
    duration: number,
    endCb: Callback,
    startIdle: boolean
  ) {
    this.idler = idler;
    this.beginCb = beginCb;
    this.delay = delay;
    this.duration = duration;
    this.endCb = typeof endCb === 'undefined' ? () => {} : endCb;
    this.timeoutId = dummyTimeoutId;
    this.durationTimeoutId = dummyTimeoutId;
    this.startIdle = startIdle;
    this.init();
  }

  init(): void {
    if (!this.initialized) {
      this.initialized = true;
      this.idle = false;
      if (this.startIdle) {
        this.timeoutId = setTimeout(() => this.beginIdleModeCycle(), 0);
      } else {
        this.timeoutId = setTimeout(() => this.testTimeout(), 0);
      }
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  clear(): void {
    if (this.initialized) {
      this.interrupt();
      clearTimeout(this.timeoutId);
      this.initialized = false;
    }
  }

  isIdle(): boolean {
    return this.idle;
  }

  interrupt(): void {
    this.interruptHandlerInternal();
  }

  protected testTimeout(): void {
    if (this.isInitialized()) {
      const idleTime = this.idler.getIdleTime();
      if (idleTime >= this.delay) {
        this.beginIdleModeCycle();
      } else {
        const idleTimeRemaining = this.delay - idleTime;
        this.timeoutId = setTimeout(
          () => this.testTimeout(),
          idleTimeRemaining
        );
      }
    }
  }

  private beginIdleModeCycle(): void {
    let interruptedEarly = false;
    this.interruptHandlerInternal = () => {
      interruptedEarly = true;
    };
    this.idler.on('interrupted', this.interruptHandler);
    this.beforeIdle();
    this.idle = true;
    this.beginCb();
    if (interruptedEarly) {
      this.endIdleModeCycle();
    } else {
      this.interruptHandlerInternal = this.endIdleModeCycle.bind(this);
    }
  }

  private endIdleModeCycle(): void {
    this.interruptHandlerInternal = () => {};
    this.idler.off('interrupted', this.interruptHandler);
    this.endCb();
    this.idle = false;
    this.afterIdle();
    this.timeoutId = setTimeout(() => this.testTimeout(), this.delay);
  }

  protected beforeIdle(): void {
    if (Number.isFinite(this.duration) && this.duration >= 0)
      this.durationTimeoutId = setTimeout(
        () => this.interrupt(),
        this.duration
      );
  }

  protected afterIdle(): void {
    clearTimeout(this.durationTimeoutId);
  }
}

export { IdleTimeout };

import { Callback } from './util';
import { IdleTimeout } from './idle-timeout';

interface Idler {
  interrupt(): void;

  getIdleTime(): number;

  on(eventType: string, callback: Callback): this;

  off(eventType: string, callback: Callback): this;

  once(eventType: string, callback: Callback): this;
}

const dummyIntervalId = setInterval(() => {}, 0);

export default class IdleInterval extends IdleTimeout {
  protected intervalCb: Callback;

  protected interval: number;

  protected intervalId: ReturnType<typeof setInterval> = dummyIntervalId;

  constructor(
    idler: Idler,
    beginCb: Callback,
    delay: number,
    duration: number,
    intervalCb: Callback,
    interval: number,
    endCb: Callback
  ) {
    super(idler, beginCb, delay, duration, endCb);
    this.intervalCb = intervalCb;
    this.interval = interval;
  }

  clear(): void {
    clearInterval(this.intervalId);
    super.clear();
  }

  protected beforeIdle(): void {
    super.beforeIdle();
    this.intervalId = setInterval(this.intervalCb, this.interval);
  }

  protected afterIdle(): void {
    clearInterval(this.intervalId);
    super.afterIdle();
  }
}

export { IdleInterval };

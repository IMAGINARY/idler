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
    intervalCb: Callback,
    interval: number,
    endCb: Callback
  ) {
    super(idler, beginCb, delay, endCb);
    this.intervalCb = intervalCb;
    this.interval = interval;
  }

  clear(): void {
    clearInterval(this.intervalId);
    super.clear();
  }

  protected handleBegin(): void {
    super.handleBegin();
    this.intervalId = setInterval(this.intervalCb, this.interval);
  }

  protected handleEnd(): void {
    clearInterval(this.intervalId);
    super.handleEnd();
  }
}

export { IdleInterval };

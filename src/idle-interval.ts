import { Idler } from './idler-types';
import { Callback, dayInMs } from './util';
import { IdleTimeout } from './idle-timeout';

const dummyIntervalId = setInterval(() => {}, dayInMs);

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
    endCb: Callback,
    startIdle: boolean
  ) {
    super(idler, beginCb, delay, duration, endCb, startIdle);
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

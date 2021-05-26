// eslint-disable-next-line import/no-extraneous-dependencies
import { performance } from 'universal-perf-hooks';
import { EventEmitter } from 'events';

import { IdleTimeout } from './idle-timeout';
import { IdleInterval } from './idle-interval';
import { Interrupter } from './interrupters/interrupter';
import { Callback } from './util';

function now(): number {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  return performance.now();
}

export default class Idler extends EventEmitter {
  protected lastId: number;

  protected timers: Map<number, IdleTimeout>;

  protected lastEventTimestampMs: number;

  protected readonly interruptHandler: () => void;

  constructor(...interrupters: Interrupter[]) {
    super();
    this.lastId = 0;
    this.timers = new Map<number, IdleTimeout>();
    this.lastEventTimestampMs = now();
    this.interruptHandler = this.interrupt.bind(this);

    interrupters.forEach((interrupter) =>
      this.registerInterrupter(interrupter)
    );
  }

  addCallback(beginCb: Callback, delay: number): number;
  addCallback(beginCb: Callback, delay: number, endCb: Callback): number;
  addCallback(
    beginCb: Callback,
    delay: number,
    intervalCb: Callback,
    interval: number,
    endCb: Callback
  ): number;
  addCallback(
    beginCb: Callback,
    delay: number,
    endOrIntervalCb?: Callback,
    interval?: number,
    endCb?: Callback
  ): number {
    if (typeof endOrIntervalCb === 'undefined') {
      return this.addCallback2(beginCb, delay);
    }
    if (typeof interval === 'undefined' || typeof endCb === 'undefined') {
      return this.addCallback3(beginCb, delay, endOrIntervalCb);
    }
    return this.addCallback5(beginCb, delay, endOrIntervalCb, interval, endCb);
  }

  protected addCallback2(beginCb: Callback, delay: number): number {
    return this.addCallback3(beginCb, delay, () => {});
  }

  protected addCallback3(
    beginCb: Callback,
    delay: number,
    endCb: Callback
  ): number {
    const idleTimeout = new IdleTimeout(this, beginCb, delay, endCb);
    return this.addIdleTimeout(idleTimeout);
  }

  addCallback5(
    beginCb: Callback,
    delay: number,
    intervalCb: Callback,
    interval: number,
    endCb: Callback
  ): number {
    const idleInterval = new IdleInterval(
      this,
      beginCb,
      delay,
      intervalCb,
      interval,
      endCb
    );
    return this.addIdleTimeout(idleInterval);
  }

  protected addIdleTimeout(idleTimeout: IdleTimeout): number {
    this.lastId += 1;
    const id = this.lastId;
    this.timers.set(id, idleTimeout);
    return id;
  }

  removeCallback(id: number): void {
    const timer = this.timers.get(id);
    if (typeof timer !== 'undefined') timer.clear();
    this.timers.delete(id);
  }

  clear(): void {
    this.timers.forEach((timer) => timer.clear());
    this.timers.clear();
  }

  interrupt(): void {
    this.lastEventTimestampMs = Math.max(now(), this.lastEventTimestampMs);
    this.emit('interrupted');
  }

  /**
   * Return the time in ms since the last interruption of the idle state.
   * @returns {number}
   */
  getIdleTime(): number {
    return now() - this.lastEventTimestampMs;
  }

  registerInterrupter(interrupter: Interrupter): this {
    interrupter.on('interrupted', this.interruptHandler);
    return this;
  }

  unregisterInterrupter(interrupter: Interrupter): this {
    interrupter.off('interrupted', this.interruptHandler);
    return this;
  }
}

export { Idler };

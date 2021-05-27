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

type CallbackOptions = {
  delay: number;
  onBegin: Callback;
  onEnd: Callback;
  interval: number;
  onInterval: Callback;
};

const defaultCallbackOptions: CallbackOptions = {
  delay: 60 * 1000,
  onBegin: () => {},
  onEnd: () => {},
  interval: Number.POSITIVE_INFINITY,
  onInterval: () => {},
};

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

  addCallback(options: Partial<CallbackOptions>): number {
    if (
      typeof options.interval !== 'undefined' &&
      Number.isFinite(options.interval)
    ) {
      const { onBegin, delay, onInterval, interval, onEnd } = {
        ...defaultCallbackOptions,
        ...options,
      };
      const idleInterval = new IdleInterval(
        this,
        onBegin,
        delay,
        onInterval,
        interval,
        onEnd
      );
      return this.addIdleTimeout(idleInterval);
    }
    const { onBegin, delay, onEnd } = {
      ...defaultCallbackOptions,
      ...options,
    };
    const idleTimeout = new IdleTimeout(this, onBegin, delay, onEnd);
    return this.addIdleTimeout(idleTimeout);
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

export { Idler, CallbackOptions };

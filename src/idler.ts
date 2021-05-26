// eslint-disable-next-line import/no-extraneous-dependencies
import { performance } from 'universal-perf-hooks';
import { EventEmitter } from 'events';

import IdleTimer from './idle-timer';
import { Interrupter } from './interrupters/interrupter';
import { isIterable } from './util';

function now(): number {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  return performance.now();
}

export default class Idler extends EventEmitter {
  protected lastId: number;

  protected timers: Map<number, IdleTimer>;

  protected lastEventTimestampMs: number;

  protected readonly interruptHandler: () => void;

  constructor(interrupter: Interrupter);
  constructor(interrupters: Iterable<Interrupter>);
  constructor(interrupters?: Interrupter | Iterable<Interrupter>) {
    super();
    this.lastId = 0;
    this.timers = new Map<number, IdleTimer>();
    this.lastEventTimestampMs = now();
    this.interruptHandler = this.interrupt.bind(this);

    if (typeof interrupters !== 'undefined') {
      if (isIterable(interrupters)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const interrupter of interrupters) {
          this.registerInterrupter(interrupter);
        }
      } else {
        this.registerInterrupter(interrupters);
      }
    }
  }

  setTimeout(
    func: (...args: unknown[]) => void,
    timeoutDelay: number,
    ...args: unknown[]
  ): number {
    this.lastId += 1;
    const id = this.lastId;
    this.timers.set(
      id,
      new IdleTimer(this, false, func, timeoutDelay, ...args)
    );
    return id;
  }

  setInterval(
    func: (...args: unknown[]) => void,
    timeoutDelay: number,
    ...args: unknown[]
  ): number {
    this.lastId += 1;
    const id = this.lastId;
    this.timers.set(id, new IdleTimer(this, true, func, timeoutDelay, ...args));
    return id;
  }

  clearTimeout(id: number): void {
    const timer = this.timers.get(id);
    if (typeof timer !== 'undefined') timer.clear();
    this.timers.delete(id);
  }

  clearInterval(id: number): void {
    this.clearTimeout(id);
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

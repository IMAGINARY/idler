import { performance } from 'universal-perf-hooks';
import { EventEmitter } from 'events';

import IdleTimer from './idle-timer';

function now(): number {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  return performance.now() as number;
}

export default class Idler extends EventEmitter {
  protected lastId: number;

  protected timers: Map<number, IdleTimer>;

  protected lastEventTimestampMs: number;

  constructor() {
    super();
    this.lastId = 0;
    this.timers = new Map<number, IdleTimer>();
    this.lastEventTimestampMs = now();
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
}

export { Idler };

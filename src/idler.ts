// eslint-disable-next-line import/no-extraneous-dependencies
import { performance } from 'universal-perf-hooks';
import { EventEmitter } from 'events';

import { IdleTimeout } from './idle-timeout';
import { IdleInterval } from './idle-interval';
import { IdleAnimation } from './idle-animation';
import { Interrupter } from './interrupters/interrupter';
import { Callback } from './util';

function now(): number {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  return performance.now();
}

type CallbackOptions = {
  delay: number;
  duration: number;
  onBegin: Callback;
  onEnd: Callback;
  interval: number;
  onInterval: Callback;
  onAnimate: FrameRequestCallback;
  immediate: boolean;
};

const defaultCallbackOptions: CallbackOptions = {
  delay: 60 * 1000,
  duration: Number.POSITIVE_INFINITY,
  onBegin: () => {},
  onEnd: () => {},
  interval: Number.POSITIVE_INFINITY,
  onInterval: () => {},
  onAnimate: () => {},
  immediate: false,
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
    if (typeof options.onAnimate !== 'undefined') {
      const {
        onBegin,
        delay,
        duration,
        onAnimate,
        onInterval,
        interval,
        onEnd,
        immediate,
      } = {
        ...defaultCallbackOptions,
        ...options,
      };
      const idleAnimation = new IdleAnimation(
        this,
        onBegin,
        delay,
        duration,
        onAnimate,
        onInterval,
        interval,
        onEnd,
        immediate
      );
      return this.addIdleTimeout(idleAnimation);
    }
    if (
      typeof options.interval !== 'undefined' &&
      Number.isFinite(options.interval)
    ) {
      const {
        onBegin,
        delay,
        duration,
        onInterval,
        interval,
        onEnd,
        immediate,
      } = {
        ...defaultCallbackOptions,
        ...options,
      };
      const idleInterval = new IdleInterval(
        this,
        onBegin,
        delay,
        duration,
        onInterval,
        interval,
        onEnd,
        immediate
      );
      return this.addIdleTimeout(idleInterval);
    }
    const { onBegin, delay, duration, onEnd, immediate } = {
      ...defaultCallbackOptions,
      ...options,
    };
    const idleTimeout = new IdleTimeout(
      this,
      onBegin,
      delay,
      duration,
      onEnd,
      immediate
    );
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

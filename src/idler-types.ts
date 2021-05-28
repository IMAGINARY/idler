import { EventEmitter } from 'events';

import { Callback } from './util';
import { Interrupter } from './interrupters/interrupter';

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

interface Idler extends EventEmitter {
  addCallback(options: Partial<CallbackOptions>): number;

  removeCallback(id: number): void;

  clear(): void;

  interrupt(): void;

  /**
   * Return the time in ms since the last interruption of the idle state.
   * @returns {number}
   */
  getIdleTime(): number;

  registerInterrupter(interrupter: Interrupter): this;

  unregisterInterrupter(interrupter: Interrupter): this;
}

export { Idler, CallbackOptions };

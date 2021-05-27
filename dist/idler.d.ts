/// <reference types="node" />
import { EventEmitter } from 'events';
import { IdleTimeout } from './idle-timeout';
import { Interrupter } from './interrupters/interrupter';
import { Callback } from './util';
declare type CallbackOptions = {
    delay: number;
    duration: number;
    onBegin: Callback;
    onEnd: Callback;
    interval: number;
    onInterval: Callback;
    onAnimate: FrameRequestCallback;
};
export default class Idler extends EventEmitter {
    protected lastId: number;
    protected timers: Map<number, IdleTimeout>;
    protected lastEventTimestampMs: number;
    protected readonly interruptHandler: () => void;
    constructor(...interrupters: Interrupter[]);
    addCallback(options: Partial<CallbackOptions>): number;
    protected addIdleTimeout(idleTimeout: IdleTimeout): number;
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
//# sourceMappingURL=idler.d.ts.map
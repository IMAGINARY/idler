/// <reference types="node" />
import { EventEmitter } from 'events';
import { IdleTimeout } from './idle-timeout';
import { Interrupter } from './interrupters/interrupter';
import { Callback } from './util';
export default class Idler extends EventEmitter {
    protected lastId: number;
    protected timers: Map<number, IdleTimeout>;
    protected lastEventTimestampMs: number;
    protected readonly interruptHandler: () => void;
    constructor(...interrupters: Interrupter[]);
    addCallback(beginCb: Callback, delay: number): number;
    addCallback(beginCb: Callback, delay: number, endCb: Callback): number;
    addCallback(beginCb: Callback, delay: number, intervalCb: Callback, interval: number, endCb: Callback): number;
    protected addCallback2(beginCb: Callback, delay: number): number;
    protected addCallback3(beginCb: Callback, delay: number, endCb: Callback): number;
    addCallback5(beginCb: Callback, delay: number, intervalCb: Callback, interval: number, endCb: Callback): number;
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
export { Idler };
//# sourceMappingURL=idler.d.ts.map
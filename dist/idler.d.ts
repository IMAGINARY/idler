/// <reference types="node" />
import { EventEmitter } from 'events';
import { Idler, CallbackOptions } from './idler-types';
import { IdleTimeout } from './idle-timeout';
import { Interrupter } from './interrupters/interrupter';
export default class IdlerImpl extends EventEmitter implements Idler {
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
export { IdlerImpl as Idler, CallbackOptions };
//# sourceMappingURL=idler.d.ts.map
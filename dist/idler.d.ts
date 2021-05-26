/// <reference types="node" />
import { EventEmitter } from 'events';
import IdleTimer from './idle-timer';
import { Interrupter } from './interrupters/interrupter';
export default class Idler extends EventEmitter {
    protected lastId: number;
    protected timers: Map<number, IdleTimer>;
    protected lastEventTimestampMs: number;
    protected readonly interruptHandler: () => void;
    constructor(interrupter: Interrupter);
    constructor(interrupters: Iterable<Interrupter>);
    setTimeout(func: (...args: unknown[]) => void, timeoutDelay: number, ...args: unknown[]): number;
    setInterval(func: (...args: unknown[]) => void, timeoutDelay: number, ...args: unknown[]): number;
    clearTimeout(id: number): void;
    clearInterval(id: number): void;
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
/// <reference types="node" />
import { EventEmitter } from 'events';
import IdleTimer from './idle-timer';
export default class Idler extends EventEmitter {
    protected lastId: number;
    protected timers: Map<number, IdleTimer>;
    protected lastEventTimestampMs: number;
    constructor();
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
}
export { Idler };
//# sourceMappingURL=idler.d.ts.map
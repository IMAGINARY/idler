import { Callback } from './util';
import { IdleTimeout } from './idle-timeout';
interface Idler {
    interrupt(): void;
    getIdleTime(): number;
    on(eventType: string, callback: Callback): this;
    off(eventType: string, callback: Callback): this;
    once(eventType: string, callback: Callback): this;
}
export default class IdleInterval extends IdleTimeout {
    protected intervalCb: Callback;
    protected interval: number;
    protected intervalId: ReturnType<typeof setInterval>;
    constructor(idler: Idler, beginCb: Callback, delay: number, duration: number, intervalCb: Callback, interval: number, endCb: Callback);
    clear(): void;
    protected handleBegin(): void;
    protected handleEnd(): void;
}
export { IdleInterval };
//# sourceMappingURL=idle-interval.d.ts.map
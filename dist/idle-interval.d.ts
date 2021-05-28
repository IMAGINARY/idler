import { Idler } from './idler-types';
import { Callback } from './util';
import { IdleTimeout } from './idle-timeout';
export default class IdleInterval extends IdleTimeout {
    protected intervalCb: Callback;
    protected interval: number;
    protected intervalId: ReturnType<typeof setInterval>;
    constructor(idler: Idler, beginCb: Callback, delay: number, duration: number, intervalCb: Callback, interval: number, endCb: Callback, startIdle: boolean);
    clear(): void;
    protected beforeIdle(): void;
    protected afterIdle(): void;
}
export { IdleInterval };
//# sourceMappingURL=idle-interval.d.ts.map
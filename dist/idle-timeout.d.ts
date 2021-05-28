import { Idler } from './idler-types';
import { Callback } from './util';
export default class IdleTimeout {
    protected idler: Idler;
    protected beginCb: Callback;
    protected endCb: Callback;
    protected delay: number;
    protected duration: number;
    protected timeoutId: ReturnType<typeof setTimeout>;
    protected durationTimeoutId: ReturnType<typeof setTimeout>;
    private interruptHandler;
    private interruptHandlerInternal;
    private initialized;
    private idle;
    protected startIdle: boolean;
    constructor(idler: Idler, beginCb: Callback, delay: number, duration: number, endCb: Callback, startIdle: boolean);
    init(): void;
    isInitialized(): boolean;
    clear(): void;
    isIdle(): boolean;
    interrupt(): void;
    protected testTimeout(): void;
    private beginIdleModeCycle;
    private endIdleModeCycle;
    protected beforeIdle(): void;
    protected afterIdle(): void;
}
export { IdleTimeout };
//# sourceMappingURL=idle-timeout.d.ts.map
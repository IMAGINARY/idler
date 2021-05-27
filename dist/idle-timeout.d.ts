import { Callback } from './util';
interface Idler {
    interrupt(): void;
    getIdleTime(): number;
    on(eventType: string, callback: Callback): this;
    off(eventType: string, callback: Callback): this;
    once(eventType: string, callback: Callback): this;
}
export default class IdleTimeout {
    protected idler: Idler;
    protected beginCb: Callback;
    protected endCb: Callback;
    protected delay: number;
    protected duration: number;
    protected timeoutId: ReturnType<typeof setTimeout>;
    protected durationTimeoutId: ReturnType<typeof setTimeout>;
    protected endHandler: () => void;
    private initialized;
    private idle;
    constructor(idler: Idler, beginCb: Callback, delay: number, duration: number, endCb: Callback);
    init(): void;
    isInitialized(): boolean;
    clear(): void;
    isIdle(): boolean;
    protected testTimeout(): void;
    protected handleBegin(): void;
    protected handleEnd(): void;
}
export { IdleTimeout };
//# sourceMappingURL=idle-timeout.d.ts.map
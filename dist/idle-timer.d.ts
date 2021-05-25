interface Idle {
    interrupt(): void;
    getIdleTime(): number;
}
export default class IdleTimer {
    protected idle: Idle;
    protected repeat: boolean;
    protected func: (...args: unknown[]) => void;
    protected timeoutDelay: number;
    protected args: unknown[];
    protected timeoutId: ReturnType<typeof setTimeout>;
    protected testTimeoutCb: () => void;
    constructor(idle: Idle, repeat: boolean, func: (...args: unknown[]) => void, timeoutDelay: number, ...args: unknown[]);
    reset(): void;
    clear(): void;
    protected testTimeout(): void;
}
export {};
//# sourceMappingURL=idle-timer.d.ts.map
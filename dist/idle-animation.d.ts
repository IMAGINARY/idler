import { Callback } from './util';
import { IdleInterval } from './idle-interval';
interface Idler {
    interrupt(): void;
    getIdleTime(): number;
    on(eventType: string, callback: Callback): this;
    off(eventType: string, callback: Callback): this;
    once(eventType: string, callback: Callback): this;
}
export default class IdleAnimation extends IdleInterval {
    protected animationCb: FrameRequestCallback;
    protected animationFrameRequestId: ReturnType<typeof requestAnimationFrame>;
    protected animateHandler: (ms: Parameters<FrameRequestCallback>[0]) => void;
    constructor(idler: Idler, beginCb: Callback, delay: number, duration: number, animationCb: FrameRequestCallback, intervalCb: Callback, interval: number, endCb: Callback);
    clear(): void;
    protected handleBegin(): void;
    protected animate(ms: Parameters<FrameRequestCallback>[0]): void;
    protected handleEnd(): void;
}
export { IdleAnimation };
//# sourceMappingURL=idle-animation.d.ts.map
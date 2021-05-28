import { Idler } from './idler-types';
import { Callback } from './util';
import { IdleInterval } from './idle-interval';
export default class IdleAnimation extends IdleInterval {
    protected animationCb: FrameRequestCallback;
    protected animationFrameRequestId: ReturnType<typeof requestAnimationFrame>;
    protected animateHandler: (ms: Parameters<FrameRequestCallback>[0]) => void;
    constructor(idler: Idler, beginCb: Callback, delay: number, duration: number, animationCb: FrameRequestCallback, intervalCb: Callback, interval: number, endCb: Callback, startIdle: boolean);
    clear(): void;
    protected beforeIdle(): void;
    protected animate(ms: Parameters<FrameRequestCallback>[0]): void;
    protected afterIdle(): void;
}
export { IdleAnimation };
//# sourceMappingURL=idle-animation.d.ts.map
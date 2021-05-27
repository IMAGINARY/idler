import { Callback } from './util';
import { IdleInterval } from './idle-interval';

interface Idler {
  interrupt(): void;

  getIdleTime(): number;

  on(eventType: string, callback: Callback): this;

  off(eventType: string, callback: Callback): this;

  once(eventType: string, callback: Callback): this;
}

const dummyAnimationFrameRequestId = requestAnimationFrame(() => {});

export default class IdleAnimation extends IdleInterval {
  protected animationCb: FrameRequestCallback;

  protected animationFrameRequestId: ReturnType<typeof requestAnimationFrame> =
    dummyAnimationFrameRequestId;

  protected animateHandler = this.animate.bind(this);

  constructor(
    idler: Idler,
    beginCb: Callback,
    delay: number,
    animationCb: FrameRequestCallback,
    intervalCb: Callback,
    interval: number,
    endCb: Callback
  ) {
    super(idler, beginCb, delay, intervalCb, interval, endCb);
    this.animationCb = animationCb;
  }

  clear(): void {
    cancelAnimationFrame(this.animationFrameRequestId);
    super.clear();
  }

  protected handleBegin(): void {
    super.handleBegin();
    this.animationFrameRequestId = requestAnimationFrame(this.animateHandler);
  }

  protected animate(ms: Parameters<FrameRequestCallback>[0]): void {
    this.animationCb(ms);
    this.animationFrameRequestId = requestAnimationFrame(this.animateHandler);
  }

  protected handleEnd(): void {
    cancelAnimationFrame(this.animationFrameRequestId);
    super.handleEnd();
  }
}

export { IdleAnimation };

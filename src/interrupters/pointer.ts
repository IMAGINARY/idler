import { EventInterrupter } from './event';
import { EventEmitterOnOffOrEventTargetAddRemove } from '../util';

const pointerEvents = ['pointerdown', 'pointermove', 'pointerup'];
const mouseAndTouchEvents = [
  'mousedown',
  'mousemove',
  'mouseup',
  'touchstart',
  'touchmove',
  'touchend',
];

export default class PointerInterrupter extends EventInterrupter {
  constructor(
    eventEmittersOrTargets:
      | EventEmitterOnOffOrEventTargetAddRemove
      | Iterable<EventEmitterOnOffOrEventTargetAddRemove> = [document]
  ) {
    super(eventEmittersOrTargets, PointerInterrupter.getEventTypes());
  }

  protected static getEventTypes(): string[] {
    return typeof window.PointerEvent === 'function'
      ? pointerEvents
      : mouseAndTouchEvents;
  }
}

export { PointerInterrupter };

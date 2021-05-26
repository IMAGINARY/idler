import { EventEmitter } from 'events';

export type EventEmitterOnOff = Pick<EventEmitter, 'on' | 'off'>;
export type EventTargetAddRemove = Pick<
  EventTarget,
  'addEventListener' | 'removeEventListener'
>;
export type EventEmitterOnOffOrEventTargetAddRemove =
  | EventEmitterOnOff
  | EventTargetAddRemove;

export function hasOnOff(
  obj: EventEmitterOnOffOrEventTargetAddRemove
): obj is EventEmitterOnOff {
  return (
    typeof (obj as EventEmitterOnOff).on !== 'undefined' &&
    typeof (obj as EventEmitterOnOff).off !== 'undefined'
  );
}

export function isIterable<X>(i: X | Iterable<X>): i is Iterable<X> {
  return (
    i !== null &&
    typeof i !== 'undefined' &&
    typeof (i as Iterable<X>)[Symbol.iterator] === 'function'
  );
}

export type Callback = () => void;

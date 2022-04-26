/// <reference types="node" />
import { EventEmitter } from 'events';
export declare type EventEmitterOnOff = Pick<EventEmitter, 'on' | 'off'>;
export declare type EventTargetAddRemove = Pick<EventTarget, 'addEventListener' | 'removeEventListener'>;
export declare type EventEmitterOnOffOrEventTargetAddRemove = EventEmitterOnOff | EventTargetAddRemove;
export declare function hasOnOff(obj: EventEmitterOnOffOrEventTargetAddRemove): obj is EventEmitterOnOff;
export declare function isIterable<X>(i: X | Iterable<X>): i is Iterable<X>;
export declare type Callback = () => void;
export declare const dayInMs: number;
//# sourceMappingURL=util.d.ts.map
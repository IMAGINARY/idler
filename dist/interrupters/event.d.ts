import { InterrupterBase } from './base';
import { EventEmitterOnOffOrEventTargetAddRemove } from '../util';
export default class EventInterrupter extends InterrupterBase {
    protected eventEmitters: Set<EventEmitterOnOffOrEventTargetAddRemove>;
    protected eventTypes: Set<string>;
    constructor(eventEmittersOrTargets?: EventEmitterOnOffOrEventTargetAddRemove | Iterable<EventEmitterOnOffOrEventTargetAddRemove>, eventTypes?: string | Iterable<string>);
    addEventEmitter(...eventEmittersOrTargets: EventEmitterOnOffOrEventTargetAddRemove[]): this;
    removeEventEmitter(...eventEmittersOrTargets: EventEmitterOnOffOrEventTargetAddRemove[]): this;
    hasEventEmitter(eventEmitterOrTarget: EventEmitterOnOffOrEventTargetAddRemove): boolean;
    addEventType(...eventTypes: string[]): this;
    removeEventType(...eventTypes: string[]): this;
    hasEventType(eventType: string): boolean;
    protected wrapOn(eventEmitterOrTarget: EventEmitterOnOffOrEventTargetAddRemove): (eventType: string) => void;
    protected wrapOff(eventEmitterOrTarget: EventEmitterOnOffOrEventTargetAddRemove): (eventType: string) => void;
}
export { EventInterrupter };
//# sourceMappingURL=event.d.ts.map
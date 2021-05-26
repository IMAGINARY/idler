import { EventInterrupter } from './event';
import { EventEmitterOnOffOrEventTargetAddRemove } from '../util';
export default class PointerInterrupter extends EventInterrupter {
    constructor(eventEmittersOrTargets?: EventEmitterOnOffOrEventTargetAddRemove | Iterable<EventEmitterOnOffOrEventTargetAddRemove>);
    protected static getEventTypes(): string[];
}
export { PointerInterrupter };
//# sourceMappingURL=pointer.d.ts.map
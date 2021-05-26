/// <reference types="node" />
import { EventEmitter } from 'events';
import { Interrupter } from './interrupter';
export default class InterrupterBase extends EventEmitter implements Interrupter {
    protected readonly emitInterruptedHandler: () => void;
    constructor();
    emitInterrupted(): void;
}
export { InterrupterBase };
//# sourceMappingURL=base.d.ts.map
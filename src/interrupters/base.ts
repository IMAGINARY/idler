import { EventEmitter } from 'events';
import { Interrupter } from './interrupter';

export default class InterrupterBase
  extends EventEmitter
  implements Interrupter
{
  protected readonly emitInterruptedHandler: () => void;

  constructor() {
    super();
    this.emitInterruptedHandler = this.emitInterrupted.bind(this);
  }

  emitInterrupted(): void {
    this.emit('interrupted');
  }
}

export { InterrupterBase };

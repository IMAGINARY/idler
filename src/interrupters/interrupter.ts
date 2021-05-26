import { EventEmitter } from 'events';

export default interface Interrupter extends EventEmitter {
  emitInterrupted(): void;
}

export { Interrupter };

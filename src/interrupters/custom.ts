import { InterrupterBase } from './base';

export default class CustomInterrupter extends InterrupterBase {
  constructor(onInit: (onInterrupted: () => void) => unknown) {
    super();
    onInit(this.emitInterruptedHandler);
  }
}

export { CustomInterrupter };

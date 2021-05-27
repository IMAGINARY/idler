import { EventInterrupter } from './event';
import { EventEmitterOnOffOrEventTargetAddRemove } from '../util';

const keyboardEvents = ['keydown', 'keyup'];

export default class KeyboardInterrupter extends EventInterrupter {
  constructor(
    eventEmittersOrTargets:
      | EventEmitterOnOffOrEventTargetAddRemove
      | Iterable<EventEmitterOnOffOrEventTargetAddRemove> = [document]
  ) {
    super(eventEmittersOrTargets, keyboardEvents);
  }
}

export { KeyboardInterrupter };

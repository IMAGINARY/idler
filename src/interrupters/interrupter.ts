import { Callback } from '../util';

export default interface Interrupter {
  on(eventName: string, listener: Callback): unknown;
  off(eventName: string, listener: Callback): unknown;
}

export { Interrupter };

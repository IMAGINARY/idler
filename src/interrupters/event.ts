import { InterrupterBase } from './base';
import {
  EventEmitterOnOffOrEventTargetAddRemove,
  hasOnOff,
  isIterable,
} from '../util';

export default class EventInterrupter extends InterrupterBase {
  protected eventEmitters: Set<EventEmitterOnOffOrEventTargetAddRemove>;

  protected eventTypes: Set<string>;

  constructor(
    eventEmittersOrTargets?:
      | EventEmitterOnOffOrEventTargetAddRemove
      | Iterable<EventEmitterOnOffOrEventTargetAddRemove>,
    eventTypes?: string | Iterable<string>
  ) {
    super();
    this.eventEmitters = new Set<EventEmitterOnOffOrEventTargetAddRemove>();
    this.eventTypes = new Set<string>();
    if (typeof eventEmittersOrTargets !== 'undefined') {
      if (isIterable(eventEmittersOrTargets)) {
        this.addEventEmitter(...eventEmittersOrTargets);
      } else {
        this.addEventEmitter(eventEmittersOrTargets);
      }
    }
    if (typeof eventTypes !== 'undefined') {
      if (isIterable(eventTypes)) {
        this.addEventType(...eventTypes);
      } else {
        this.addEventType(eventTypes);
      }
    }
  }

  addEventEmitter(
    ...eventEmittersOrTargets: EventEmitterOnOffOrEventTargetAddRemove[]
  ): this {
    eventEmittersOrTargets.forEach((eventEmitterOrTarget) => {
      if (!this.eventEmitters.has(eventEmitterOrTarget)) {
        const on = this.wrapOn(eventEmitterOrTarget);
        this.eventTypes.forEach(on);
      }
      this.eventEmitters.add(eventEmitterOrTarget);
    });
    return this;
  }

  removeEventEmitter(
    ...eventEmittersOrTargets: EventEmitterOnOffOrEventTargetAddRemove[]
  ): this {
    eventEmittersOrTargets.forEach((eventEmitterOrTarget) => {
      if (this.eventEmitters.has(eventEmitterOrTarget)) {
        const off = this.wrapOff(eventEmitterOrTarget);
        this.eventTypes.forEach(off);
      }
      this.eventEmitters.delete(eventEmitterOrTarget);
    });
    return this;
  }

  hasEventEmitter(
    eventEmitterOrTarget: EventEmitterOnOffOrEventTargetAddRemove
  ): boolean {
    return this.eventEmitters.has(eventEmitterOrTarget);
  }

  addEventType(...eventTypes: string[]): this {
    eventTypes.forEach((eventType) => {
      if (!this.eventTypes.has(eventType))
        this.eventEmitters.forEach((eventEmitter) =>
          this.wrapOn(eventEmitter)(eventType)
        );
      this.eventTypes.add(eventType);
    });
    return this;
  }

  removeEventType(...eventTypes: string[]): this {
    eventTypes.forEach((eventType) => {
      if (this.eventTypes.has(eventType))
        this.eventEmitters.forEach((eventEmitter) =>
          this.wrapOff(eventEmitter)(eventType)
        );
      this.eventTypes.delete(eventType);
    });
    return this;
  }

  hasEventType(eventType: string): boolean {
    return this.eventTypes.has(eventType);
  }

  protected wrapOn(
    eventEmitterOrTarget: EventEmitterOnOffOrEventTargetAddRemove
  ): (eventType: string) => void {
    return hasOnOff(eventEmitterOrTarget)
      ? (eventType: string) =>
          eventEmitterOrTarget.on(eventType, this.emitInterruptedHandler)
      : (eventType: string) =>
          eventEmitterOrTarget.addEventListener(
            eventType,
            this.emitInterruptedHandler
          );
  }

  protected wrapOff(
    eventEmitterOrTarget: EventEmitterOnOffOrEventTargetAddRemove
  ): (eventType: string) => void {
    return hasOnOff(eventEmitterOrTarget)
      ? (eventType: string) =>
          eventEmitterOrTarget.on(eventType, this.emitInterruptedHandler)
      : (eventType: string) =>
          eventEmitterOrTarget.addEventListener(
            eventType,
            this.emitInterruptedHandler
          );
  }
}

export { EventInterrupter };

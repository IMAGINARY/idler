# Idler

This library manages the idle state of web apps. Several ways to interrupt the idle state are available and more are
about to be added. Adding custom interrupters is easy as well.

## Installation

### NodeJS

```shell
npm install --save @imaginary-maths/idler
```

Then, use either

```js
const { Idler } = require('idler');
```

or

```js
import { Idler } from 'idler';
```

### Browsers

Pick the `.js` module of your choice from the `dist` folder.

#### ES module

For [modern browsers](https://github.com/developit/microbundle#-modern-mode-), use

```html
<script type="module">
  import { Idler } from './dist/idler.modern.js';
</script>
```

For [older browsers](https://github.com/developit/microbundle#-modern-mode-), use

```html
<script type="module">
  import { Idler } from './dist/idler.umd.js';
</script>
```

#### UMD version

```html
<script src="./dist/idler.umd.js"></script>
<script>
  const { Idler } = idler;
</script>
```

## Usage

You usually need to import the main `Idler` class and at least one of the interrupters (`PointerInterrupter`, `KeyboardInterrupter`, ...). After initialization, you can add idle callbacks.

```js
import { Idler, PointerInterrupter } from 'idler';

// Create a new idler
const myIdler = new Idler(new PointerInterrupter());

// Attach callbacks
const callbackOptions = {
  delay: 5 * 1000, // idle after not being interrupted for 5s
  duration: 60 * 1000, // not idle anymore after 1min in idle mode
  onBegin: () => console.log('begin'), // called after 5s without interruption
  onEnd: () => console.log('end'), // called after interrupted in idle mode
  interval: 10 * 1000, // repeat onInterval every 10s in idle mode
  onInterval: () => console.log('interval'), // called every 10s when in idle mode
  onAnimate: (ms) => console.log('animate', ms), // animate via requestAnimationFrame while in idle mode
  immediate: true, // start the first run immediately
};
const cbId = myIdler.addCallback(callbackOptions);

// Detach a callback
myIdler.removeCallback(cbId);
```

### Creating custom interrupters

For very simple use cases, you should just call `Idler.interrupt()` whenever idle mode should be interrupted:

```js
button.addEventListener('click', () => idler.interrupt());
```

However, more complex scenarios may demand separation of the code for easier reuse and maintenance. In this case, you should implement your own `Interrupter`, whose interface should look like this:

```typescript
interface Interrupter {
  on(eventName: string, listener: Callback): unknown;
  off(eventName: string, listener: Callback): unknown;
}
```

The interrupter needs to call the listeners registered to the `interrupted` event on interruption. That's it.

This library provides `InterrupterBase`, which makes this particularly easy to implement through subclassing:

```js
import InterrupterBase from 'idler';

class IntervalInterupter extends InterrupterBase {
  constructor() {
    // Interrupt every 60s
    setInterval(() => this.emitInterrupted(), 60 * 1000);
  }
}
```

If subclassing isn't appropriate, the `CustomInterrupter` class can be used:

```typescript
import CustomInterrupter from 'idler';

function onInit(onInterrupted: () => void) {
  // Interrupt every 60s
  setInterval(onInterrupted, 60 * 1000);
}

const customInterrupter = new CustomInterrupter(onInit);
```

The `onInit` method is called only once during the initialization of `CustomInterrupter`.

## Compilation

This library is built is written in TypeScript (see `package.json` for the TypeScript version).

To make any modifications re-compilation is necessary. You should install:

- `node`, `npm`

Afterwards run the following in the command line to install dependencies:

```shell
npm install
```

For compiling the sources and generating the redistributable files run:

```shell
npm run build
```

During development, you can let the bundler watch the sources and rebuild automatically:

```shell
npm run dev
```

## TODOs before reaching v1.0

- [x] Idle animations (via `requestAnimationFrame`)
- [x] Idle durations
- [x] Interrupter for mouse, touch and pointer input
- [ ] Interrupter for keyboard input
- [ ] Interrupter for MIDI input
- [ ] Interrupter for gamepad input
- [ ] Check behaviour with respect to event bubbling/capture
- [ ] Event filters for event based interrupters (pointers, MIDI)
- [ ] Button filters for gamepad interrupter
- [x] Custom interrupters without subclassing
- [ ] Compatibility with Electron apps (for monitoring several renderer processes from the main process)
- [ ] Full API doc

## Credits

Developed by Christian Stussak, IMAGINARY gGmbH.

## License

Copyright 2021 IMAGINARY gGmbH

Licensed under the Apache License, Version 2.0 (see `LICENSE`).

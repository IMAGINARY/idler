# Idler

This library manages the idle state of web apps. Several ways to interrupt the idle state are available and more are
about to be added. Adding custom interrupters is easy as well.

## Installation

### NodeJS

```shell
npm install --save
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
const cbId0 = myIdler.addCallback(
  () => console.log('not interupted for 5s'),
  5000
);

const cbId1 = myIdler.addCallback(
  () => console.log('not interupted for 10s'),
  10000,
  () => console.log('interrupted during idle mode')
);

const cbId2 = myIdler.addCallback(
  () => console.log('not interupted for 3s'),
  3000,
  () => console.log('in idle mode for multiple of 1s'),
  1000,
  () => console.log('interrupted during idle mode')
);

// Detach a callback
myIdler.removeCallback(cbId0);
```

### Creating custom interrupters

Currently, custom interrupters need to extend `InterrupterBase`. This is likely to change in the future.

```js
class IntervalInterupter extends InterrupterBase {
  constructor() {
    // Interrupt every 60s
    setInterval(() => this.emitInterrupted(), 60 * 1000);
  }
}
```

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
- [ ] Custom interrupters without extending `InterrupterBase`
- [ ] Compatibility with Electron apps (for monitoring several renderer processes from the main process)
- [ ] Full API doc

## Credits

Developed by Christian Stussak, IMAGINARY gGmbH.

## License

Copyright 2021 IMAGINARY gGmbH

Licensed under the Apache License, Version 2.0 (see `LICENSE`).

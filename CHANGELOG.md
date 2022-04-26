# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.3.1] - 2022-04-26

### Fixed

- dummy idle interval callback firing rapidly when no user-defined callback is set

## [0.3.0] - 2021-05-28

### Added

- `immediate` option for starting the first idle run immediately
- `CustomInterrupter` class and `Interrupter` type for custom interrupters without subclassing

### Fixed

- idle timeouts firing too early after idle duration is over
- undefined behaviour when idle mode is interrupted from the `onBegin` callback

## [0.2.1] - 2021-05-27

This release just updates the user guide with respect to the changes introduced in [0.2.0].

## [0.2.0] - 2021-05-27

### Added

- Idle animations via `requestAnimationFrame()`
- Duration after which idle mode is left automatically

### Changed

- `Idler.addCallback()` parameter list towards single option object

## [0.1.0] - 2021-05-27

### Added

- `Idler` class for managing idle callbacks
- `PointerInterrupter` for interrupting via mouse, touch and pointer events
- `KeyboardInterrupter` for interrupting via keyboard events

[unreleased]: https://github.com/IMAGINARY/idler/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/IMAGINARY/idler/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/IMAGINARY/idler/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/IMAGINARY/idler/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/IMAGINARY/idler/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/IMAGINARY/idler/compare/v0.0.0...v0.1.0

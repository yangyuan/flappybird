/// <reference path="./configs.ts" />
/// <reference path="./emulator.ts" />

declare var exports: any
(function (exports) {
  exports.Emulator = Emulator;
  exports.Configs = Configs;
}(typeof exports === 'undefined' ? {} : exports));
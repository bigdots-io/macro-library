"use strict";

var ProgrammableMacro = require('./macros/programmable'),
    TwinkleMacro = require('./macros/twinkle'),
    StartUpMacro = require('./macros/start-up'),
    SolidColorMacro = require('./macros/solid-color'),
    UnsupportedMacro = require('./macros/unsupported');

var MacroConfig = require('./macro-config');

class MacroManager {
  constructor() {
    this.Macros = {};
    this.activateMacro = null;
  }

  registerMacros() {
    this.Macros[ProgrammableMacro.identifier] = ProgrammableMacro;
    this.Macros[TwinkleMacro.identifier] = TwinkleMacro;
    this.Macros[StartUpMacro.identifier] = StartUpMacro;
    this.Macros[SolidColorMacro.identifier] = SolidColorMacro;
  }

  availableMacros() {
    return MacroConfig
  }

  loadMacro(name, options) {
    if(this.activateMacro) {
      this.activateMacro.stop();
    }

    var Macro = this.Macros[name] || UnsupportedMacro;
    this.activateMacro = new Macro(options);
    this.activateMacro.start();
  }
}

module.exports = MacroManager;

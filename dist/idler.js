function e(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,t(e,n)}function t(e,n){return(t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,n)}function n(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function r(e,i,o){return(r=n()?Reflect.construct:function(e,n,r){var i=[null];i.push.apply(i,n);var o=new(Function.bind.apply(e,i));return r&&t(o,r.prototype),o}).apply(null,arguments)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s,u,a=(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.PerformanceObserver=t.performance=void 0,t.performance=window.performance,t.PerformanceObserver=window.PerformanceObserver}(s={exports:{}},s.exports),s.exports),c="object"==typeof Reflect?Reflect:null,f=c&&"function"==typeof c.apply?c.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};u=c&&"function"==typeof c.ownKeys?c.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var l=Number.isNaN||function(e){return e!=e};function p(){p.init.call(this)}var v=p;p.EventEmitter=p,p.prototype._events=void 0,p.prototype._eventsCount=0,p.prototype._maxListeners=void 0;var h=10;function d(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function m(e){return void 0===e._maxListeners?p.defaultMaxListeners:e._maxListeners}function y(e,t,n,r){var i,o,s;if(d(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(i=m(e))>0&&s.length>i&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,console&&console.warn&&console.warn(u)}return e}function E(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function g(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=E.bind(r);return i.listener=n,r.wrapFn=i,i}function w(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):L(i,i.length)}function b(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function L(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function T(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function i(o){r.once&&e.removeEventListener(t,i),n(o)})}}Object.defineProperty(p,"defaultMaxListeners",{enumerable:!0,get:function(){return h},set:function(e){if("number"!=typeof e||e<0||l(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");h=e}}),p.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},p.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||l(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},p.prototype.getMaxListeners=function(){return m(this)},p.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)f(u,this,t);else{var a=u.length,c=L(u,a);for(n=0;n<a;++n)f(c[n],this,t)}return!0},p.prototype.on=p.prototype.addListener=function(e,t){return y(this,e,t,!1)},p.prototype.prependListener=function(e,t){return y(this,e,t,!0)},p.prototype.once=function(e,t){return d(t),this.on(e,g(this,e,t)),this},p.prototype.prependOnceListener=function(e,t){return d(t),this.prependListener(e,g(this,e,t)),this},p.prototype.off=p.prototype.removeListener=function(e,t){var n,r,i,o,s;if(d(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},p.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},p.prototype.listeners=function(e){return w(this,e,!0)},p.prototype.rawListeners=function(e){return w(this,e,!1)},p.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):b.call(e,t)},p.prototype.listenerCount=b,p.prototype.eventNames=function(){return this._eventsCount>0?u(this._events):[]},v.once=function(e,t){return new Promise(function(n,r){function i(n){e.removeListener(t,o),r(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",i),n([].slice.call(arguments))}T(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&T(e,"error",t,{once:!0})}(e,i)})};var _=setTimeout(function(){},0),O=function(){function e(e,t,n,r){var i=this;this.timeoutId=_,this.idle=e,this.repeat=t,this.func=n,this.timeoutDelay=r,this.args=[].slice.call(arguments,4),this.testTimeoutCb=function(){return i.testTimeout()},this.testTimeout()}var t=e.prototype;return t.reset=function(){clearTimeout(this.timeoutId),this.timeoutId=setTimeout(this.testTimeoutCb,this.timeoutDelay)},t.clear=function(){clearTimeout(this.timeoutId)},t.testTimeout=function(){var e=this.idle.getIdleTime();e>=this.timeoutDelay?(this.repeat&&this.reset(),this.func.apply(this,this.args)):this.timeoutId=setTimeout(this.testTimeoutCb,this.timeoutDelay-e)},e}();function I(e){return void 0!==e.on&&void 0!==e.off}function x(e){return null!=e&&"function"==typeof e[Symbol.iterator]}function j(){return a.performance.now()}var C=function(t){function n(e){var n;if((n=t.call(this)||this).lastId=0,n.timers=new Map,n.lastEventTimestampMs=j(),n.interruptHandler=n.interrupt.bind(i(n)),void 0!==e)if(x(e))for(var r,s=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e))){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(e);!(r=s()).done;)n.registerInterrupter(r.value);else n.registerInterrupter(e);return n}e(n,t);var s=n.prototype;return s.setTimeout=function(e,t){this.lastId+=1;var n=this.lastId;return this.timers.set(n,r(O,[this,!1,e,t].concat([].slice.call(arguments,2)))),n},s.setInterval=function(e,t){this.lastId+=1;var n=this.lastId;return this.timers.set(n,r(O,[this,!0,e,t].concat([].slice.call(arguments,2)))),n},s.clearTimeout=function(e){var t=this.timers.get(e);void 0!==t&&t.clear(),this.timers.delete(e)},s.clearInterval=function(e){this.clearTimeout(e)},s.clear=function(){this.timers.forEach(function(e){return e.clear()}),this.timers.clear()},s.interrupt=function(){this.lastEventTimestampMs=Math.max(j(),this.lastEventTimestampMs),this.emit("interrupted")},s.getIdleTime=function(){return j()-this.lastEventTimestampMs},s.registerInterrupter=function(e){return e.on("interrupted",this.interruptHandler),this},s.unregisterInterrupter=function(e){return e.off("interrupted",this.interruptHandler),this},n}(v.EventEmitter),P=function(t){function n(){var e;return(e=t.call(this)||this).emitInterruptedHandler=e.emitInterrupted.bind(i(e)),e}return e(n,t),n.prototype.emitInterrupted=function(){this.emit("interrupted")},n}(v.EventEmitter),M=function(t){function n(e,n){var r,i,o;return(r=t.call(this)||this).eventEmitters=new Set,r.eventTypes=new Set,void 0!==e&&(x(e)?(i=r).addEventEmitter.apply(i,e):r.addEventEmitter(e)),void 0!==n&&(x(n)?(o=r).addEventType.apply(o,n):r.addEventType(n)),r}e(n,t);var r=n.prototype;return r.addEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(!e.eventEmitters.has(t)){var n=e.wrapOn(t);e.eventTypes.forEach(n)}e.eventEmitters.add(t)}),this},r.removeEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(e.eventEmitters.has(t)){var n=e.wrapOff(t);e.eventTypes.forEach(n)}e.eventEmitters.delete(t)}),this},r.hasEventEmitter=function(e){return this.eventEmitters.has(e)},r.addEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)||e.eventEmitters.forEach(function(n){return e.wrapOn(n)(t)}),e.eventTypes.add(t)}),this},r.removeEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)&&e.eventEmitters.forEach(function(n){return e.wrapOff(n)(t)}),e.eventTypes.delete(t)}),this},r.hasEventType=function(e){return this.eventTypes.has(e)},r.wrapOn=function(e){var t=this;return I(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},r.wrapOff=function(e){var t=this;return I(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},n}(P),R=["pointerdown","pointermove","pointerup"],A=["mousedown","mousemove","mouseup","touchstart","touchmove","touchend"],S=function(t){function n(e){return void 0===e&&(e=[document]),t.call(this,e,n.getEventTypes())||this}return e(n,t),n.getEventTypes=function(){return"function"==typeof window.PointerEvent?R:A},n}(M);exports.EventInterrupter=M,exports.Idler=C,exports.InterrupterBase=P,exports.PointerInterrupter=S;
//# sourceMappingURL=idler.js.map

function e(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,t(e,n)}function t(e,n){return(t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,n)}function n(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var i,o,s=(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.PerformanceObserver=t.performance=void 0,t.performance=window.performance,t.PerformanceObserver=window.PerformanceObserver}(i={exports:{}},i.exports),i.exports),u="object"==typeof Reflect?Reflect:null,a=u&&"function"==typeof u.apply?u.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};o=u&&"function"==typeof u.ownKeys?u.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var c=Number.isNaN||function(e){return e!=e};function f(){f.init.call(this)}var l=f;f.EventEmitter=f,f.prototype._events=void 0,f.prototype._eventsCount=0,f.prototype._maxListeners=void 0;var h=10;function d(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function v(e){return void 0===e._maxListeners?f.defaultMaxListeners:e._maxListeners}function p(e,t,n,r){var i,o,s;if(d(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(i=v(e))>0&&s.length>i&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,console&&console.warn&&console.warn(u)}return e}function m(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function y(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=m.bind(r);return i.listener=n,r.wrapFn=i,i}function E(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):g(i,i.length)}function b(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function g(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function w(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function i(o){r.once&&e.removeEventListener(t,i),n(o)})}}Object.defineProperty(f,"defaultMaxListeners",{enumerable:!0,get:function(){return h},set:function(e){if("number"!=typeof e||e<0||c(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");h=e}}),f.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},f.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||c(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},f.prototype.getMaxListeners=function(){return v(this)},f.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)a(u,this,t);else{var c=u.length,f=g(u,c);for(n=0;n<c;++n)a(f[n],this,t)}return!0},f.prototype.on=f.prototype.addListener=function(e,t){return p(this,e,t,!1)},f.prototype.prependListener=function(e,t){return p(this,e,t,!0)},f.prototype.once=function(e,t){return d(t),this.on(e,y(this,e,t)),this},f.prototype.prependOnceListener=function(e,t){return d(t),this.prependListener(e,y(this,e,t)),this},f.prototype.off=f.prototype.removeListener=function(e,t){var n,r,i,o,s;if(d(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},f.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},f.prototype.listeners=function(e){return E(this,e,!0)},f.prototype.rawListeners=function(e){return E(this,e,!1)},f.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):b.call(e,t)},f.prototype.listenerCount=b,f.prototype.eventNames=function(){return this._eventsCount>0?o(this._events):[]},l.once=function(e,t){return new Promise(function(n,r){function i(n){e.removeListener(t,o),r(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",i),n([].slice.call(arguments))}w(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&w(e,"error",t,{once:!0})}(e,i)})};var I=setTimeout(function(){},0),L=function(){function e(e,t,n,r){this.initialized=!1,this.idle=!1,this.idler=e,this.beginCb=t,this.delay=n,this.endCb=void 0===r?function(){}:r,this.timeoutId=I,this.init()}var t=e.prototype;return t.init=function(){var e=this;this.initialized||(this.initialized=!0,this.idle=!1,this.timeoutId=setTimeout(function(){return e.testTimeout()},0))},t.isInitialized=function(){return this.initialized},t.clear=function(){this.initialized&&(clearTimeout(this.timeoutId),this.isIdle()&&this.handleEnd(),this.initialized=!1)},t.isIdle=function(){return this.idle},t.testTimeout=function(){var e=this;if(this.isInitialized()){var t=this.idler.getIdleTime();t>=this.delay?this.handleBegin():this.timeoutId=setTimeout(function(){return e.testTimeout()},this.delay-t)}},t.handleBegin=function(){var e=this;this.idle=!0,this.beginCb(),this.idler.once("interrupted",function(){return e.handleEnd()})},t.handleEnd=function(){this.idle=!1,this.endCb(),this.testTimeout()},e}(),T=setInterval(function(){},0),_=function(t){function n(e,n,r,i,o,s){var u;return(u=t.call(this,e,n,r,s)||this).intervalId=T,u.intervalCb=i,u.interval=o,u}e(n,t);var r=n.prototype;return r.clear=function(){clearInterval(this.intervalId),t.prototype.clear.call(this)},r.handleBegin=function(){t.prototype.handleBegin.call(this),this.intervalId=setInterval(this.intervalCb,this.interval)},r.handleEnd=function(){clearInterval(this.intervalId),t.prototype.handleEnd.call(this)},n}(L);function O(e){return void 0!==e.on&&void 0!==e.off}function C(e){return null!=e&&"function"==typeof e[Symbol.iterator]}function x(){return s.performance.now()}var j=function(t){function i(e){var i;if((i=t.call(this)||this).lastId=0,i.timers=new Map,i.lastEventTimestampMs=x(),i.interruptHandler=i.interrupt.bind(n(i)),void 0!==e)if(C(e))for(var o,s=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e))){n&&(e=n);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(e);!(o=s()).done;)i.registerInterrupter(o.value);else i.registerInterrupter(e);return i}e(i,t);var o=i.prototype;return o.addCallback=function(e,t,n,r,i){return void 0===n?this.addCallback2(e,t):void 0===r||void 0===i?this.addCallback3(e,t,n):this.addCallback5(e,t,n,r,i)},o.addCallback2=function(e,t){return this.addCallback3(e,t,function(){})},o.addCallback3=function(e,t,n){var r=new L(this,e,t,n);return this.addIdleTimeout(r)},o.addCallback5=function(e,t,n,r,i){var o=new _(this,e,t,n,r,i);return this.addIdleTimeout(o)},o.addIdleTimeout=function(e){this.lastId+=1;var t=this.lastId;return this.timers.set(t,e),t},o.clearTimeout=function(e){var t=this.timers.get(e);void 0!==t&&t.clear(),this.timers.delete(e)},o.clear=function(){this.timers.forEach(function(e){return e.clear()}),this.timers.clear()},o.interrupt=function(){this.lastEventTimestampMs=Math.max(x(),this.lastEventTimestampMs),this.emit("interrupted")},o.getIdleTime=function(){return x()-this.lastEventTimestampMs},o.registerInterrupter=function(e){return e.on("interrupted",this.interruptHandler),this},o.unregisterInterrupter=function(e){return e.off("interrupted",this.interruptHandler),this},i}(l.EventEmitter),M=function(t){function r(){var e;return(e=t.call(this)||this).emitInterruptedHandler=e.emitInterrupted.bind(n(e)),e}return e(r,t),r.prototype.emitInterrupted=function(){this.emit("interrupted")},r}(l.EventEmitter),P=function(t){function n(e,n){var r,i,o;return(r=t.call(this)||this).eventEmitters=new Set,r.eventTypes=new Set,void 0!==e&&(C(e)?(i=r).addEventEmitter.apply(i,e):r.addEventEmitter(e)),void 0!==n&&(C(n)?(o=r).addEventType.apply(o,n):r.addEventType(n)),r}e(n,t);var r=n.prototype;return r.addEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(!e.eventEmitters.has(t)){var n=e.wrapOn(t);e.eventTypes.forEach(n)}e.eventEmitters.add(t)}),this},r.removeEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(e.eventEmitters.has(t)){var n=e.wrapOff(t);e.eventTypes.forEach(n)}e.eventEmitters.delete(t)}),this},r.hasEventEmitter=function(e){return this.eventEmitters.has(e)},r.addEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)||e.eventEmitters.forEach(function(n){return e.wrapOn(n)(t)}),e.eventTypes.add(t)}),this},r.removeEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)&&e.eventEmitters.forEach(function(n){return e.wrapOff(n)(t)}),e.eventTypes.delete(t)}),this},r.hasEventType=function(e){return this.eventTypes.has(e)},r.wrapOn=function(e){var t=this;return O(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},r.wrapOff=function(e){var t=this;return O(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},n}(M),k=["pointerdown","pointermove","pointerup"],A=["mousedown","mousemove","mouseup","touchstart","touchmove","touchend"],S=function(t){function n(e){return void 0===e&&(e=[document]),t.call(this,e,n.getEventTypes())||this}return e(n,t),n.getEventTypes=function(){return"function"==typeof window.PointerEvent?k:A},n}(P);exports.EventInterrupter=P,exports.Idler=j,exports.InterrupterBase=M,exports.PointerInterrupter=S;
//# sourceMappingURL=idler.js.map

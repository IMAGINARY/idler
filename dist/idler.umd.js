!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).idler={})}(this,function(e){function t(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,n(e,t)}function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var i,o=function(e){var t={exports:{}};return function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.PerformanceObserver=t.performance=void 0,t.performance=window.performance,t.PerformanceObserver=window.PerformanceObserver}(0,t.exports),t.exports}(),s="object"==typeof Reflect?Reflect:null,u=s&&"function"==typeof s.apply?s.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};i=s&&"function"==typeof s.ownKeys?s.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var a=Number.isNaN||function(e){return e!=e};function c(){c.init.call(this)}var f=c;c.EventEmitter=c,c.prototype._events=void 0,c.prototype._eventsCount=0,c.prototype._maxListeners=void 0;var l=10;function h(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function d(e){return void 0===e._maxListeners?c.defaultMaxListeners:e._maxListeners}function v(e,t,n,r){var i,o,s;if(h(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(i=d(e))>0&&s.length>i&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,console&&console.warn&&console.warn(u)}return e}function p(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function m(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=p.bind(r);return i.listener=n,r.wrapFn=i,i}function y(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):b(i,i.length)}function E(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function b(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function g(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function i(o){r.once&&e.removeEventListener(t,i),n(o)})}}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return l},set:function(e){if("number"!=typeof e||e<0||a(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");l=e}}),c.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||a(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},c.prototype.getMaxListeners=function(){return d(this)},c.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var a=i[e];if(void 0===a)return!1;if("function"==typeof a)u(a,this,t);else{var c=a.length,f=b(a,c);for(n=0;n<c;++n)u(f[n],this,t)}return!0},c.prototype.on=c.prototype.addListener=function(e,t){return v(this,e,t,!1)},c.prototype.prependListener=function(e,t){return v(this,e,t,!0)},c.prototype.once=function(e,t){return h(t),this.on(e,m(this,e,t)),this},c.prototype.prependOnceListener=function(e,t){return h(t),this.prependListener(e,m(this,e,t)),this},c.prototype.off=c.prototype.removeListener=function(e,t){var n,r,i,o,s;if(h(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},c.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},c.prototype.listeners=function(e){return y(this,e,!0)},c.prototype.rawListeners=function(e){return y(this,e,!1)},c.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):E.call(e,t)},c.prototype.listenerCount=E,c.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]},f.once=function(e,t){return new Promise(function(n,r){function i(n){e.removeListener(t,o),r(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",i),n([].slice.call(arguments))}g(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&g(e,"error",t,{once:!0})}(e,i)})};var w=setTimeout(function(){},0),L=function(){function e(e,t,n,r){this.initialized=!1,this.idle=!1,this.idler=e,this.beginCb=t,this.delay=n,this.endCb=void 0===r?function(){}:r,this.timeoutId=w,this.init()}var t=e.prototype;return t.init=function(){var e=this;this.initialized||(this.initialized=!0,this.idle=!1,this.timeoutId=setTimeout(function(){return e.testTimeout()},0))},t.isInitialized=function(){return this.initialized},t.clear=function(){this.initialized&&(clearTimeout(this.timeoutId),this.isIdle()&&this.handleEnd(),this.initialized=!1)},t.isIdle=function(){return this.idle},t.testTimeout=function(){var e=this;if(this.isInitialized()){var t=this.idler.getIdleTime();t>=this.delay?this.handleBegin():this.timeoutId=setTimeout(function(){return e.testTimeout()},this.delay-t)}},t.handleBegin=function(){var e=this;this.idle=!0,this.beginCb(),this.idler.once("interrupted",function(){return e.handleEnd()})},t.handleEnd=function(){this.idle=!1,this.endCb(),this.testTimeout()},e}(),I=setInterval(function(){},0),T=function(e){function n(t,n,r,i,o,s){var u;return(u=e.call(this,t,n,r,s)||this).intervalId=I,u.intervalCb=i,u.interval=o,u}t(n,e);var r=n.prototype;return r.clear=function(){clearInterval(this.intervalId),e.prototype.clear.call(this)},r.handleBegin=function(){e.prototype.handleBegin.call(this),this.intervalId=setInterval(this.intervalCb,this.interval)},r.handleEnd=function(){clearInterval(this.intervalId),e.prototype.handleEnd.call(this)},n}(L);function _(){return o.performance.now()}var O=function(e){function n(){var t;return(t=e.call(this)||this).lastId=0,t.timers=new Map,t.lastEventTimestampMs=_(),t.interruptHandler=t.interrupt.bind(r(t)),[].slice.call(arguments).forEach(function(e){return t.registerInterrupter(e)}),t}t(n,e);var i=n.prototype;return i.addCallback=function(e,t,n,r,i){return void 0===n?this.addCallback2(e,t):void 0===r||void 0===i?this.addCallback3(e,t,n):this.addCallback5(e,t,n,r,i)},i.addCallback2=function(e,t){return this.addCallback3(e,t,function(){})},i.addCallback3=function(e,t,n){var r=new L(this,e,t,n);return this.addIdleTimeout(r)},i.addCallback5=function(e,t,n,r,i){var o=new T(this,e,t,n,r,i);return this.addIdleTimeout(o)},i.addIdleTimeout=function(e){this.lastId+=1;var t=this.lastId;return this.timers.set(t,e),t},i.removeCallback=function(e){var t=this.timers.get(e);void 0!==t&&t.clear(),this.timers.delete(e)},i.clear=function(){this.timers.forEach(function(e){return e.clear()}),this.timers.clear()},i.interrupt=function(){this.lastEventTimestampMs=Math.max(_(),this.lastEventTimestampMs),this.emit("interrupted")},i.getIdleTime=function(){return _()-this.lastEventTimestampMs},i.registerInterrupter=function(e){return e.on("interrupted",this.interruptHandler),this},i.unregisterInterrupter=function(e){return e.off("interrupted",this.interruptHandler),this},n}(f.EventEmitter),C=function(e){function n(){var t;return(t=e.call(this)||this).emitInterruptedHandler=t.emitInterrupted.bind(r(t)),t}return t(n,e),n.prototype.emitInterrupted=function(){this.emit("interrupted")},n}(f.EventEmitter);function x(e){return void 0!==e.on&&void 0!==e.off}function j(e){return null!=e&&"function"==typeof e[Symbol.iterator]}var P=function(e){function n(t,n){var r,i,o;return(r=e.call(this)||this).eventEmitters=new Set,r.eventTypes=new Set,void 0!==t&&(j(t)?(i=r).addEventEmitter.apply(i,t):r.addEventEmitter(t)),void 0!==n&&(j(n)?(o=r).addEventType.apply(o,n):r.addEventType(n)),r}t(n,e);var r=n.prototype;return r.addEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(!e.eventEmitters.has(t)){var n=e.wrapOn(t);e.eventTypes.forEach(n)}e.eventEmitters.add(t)}),this},r.removeEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(e.eventEmitters.has(t)){var n=e.wrapOff(t);e.eventTypes.forEach(n)}e.eventEmitters.delete(t)}),this},r.hasEventEmitter=function(e){return this.eventEmitters.has(e)},r.addEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)||e.eventEmitters.forEach(function(n){return e.wrapOn(n)(t)}),e.eventTypes.add(t)}),this},r.removeEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)&&e.eventEmitters.forEach(function(n){return e.wrapOff(n)(t)}),e.eventTypes.delete(t)}),this},r.hasEventType=function(e){return this.eventTypes.has(e)},r.wrapOn=function(e){var t=this;return x(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},r.wrapOff=function(e){var t=this;return x(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},n}(C),k=["keydown","keyup"],M=function(e){function n(t){return void 0===t&&(t=[document]),e.call(this,t,k)||this}return t(n,e),n}(P),R=["pointerdown","pointermove","pointerup"],z=["mousedown","mousemove","mouseup","touchstart","touchmove","touchend"],H=function(e){function n(t){return void 0===t&&(t=[document]),e.call(this,t,n.getEventTypes())||this}return t(n,e),n.getEventTypes=function(){return"function"==typeof window.PointerEvent?R:z},n}(P);e.EventInterrupter=P,e.Idler=O,e.InterrupterBase=C,e.KeyboardInterrupter=M,e.PointerInterrupter=H});
//# sourceMappingURL=idler.umd.js.map

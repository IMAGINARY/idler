!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).idler={})}(this,function(e){function t(){return(t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function n(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,r(e,t)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var o,s=function(e){var t={exports:{}};return function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.PerformanceObserver=t.performance=void 0,t.performance=window.performance,t.PerformanceObserver=window.PerformanceObserver}(0,t.exports),t.exports}(),u="object"==typeof Reflect?Reflect:null,a=u&&"function"==typeof u.apply?u.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};o=u&&"function"==typeof u.ownKeys?u.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var l=Number.isNaN||function(e){return e!=e};function f(){f.init.call(this)}var c=f;f.EventEmitter=f,f.prototype._events=void 0,f.prototype._eventsCount=0,f.prototype._maxListeners=void 0;var d=10;function h(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function p(e){return void 0===e._maxListeners?f.defaultMaxListeners:e._maxListeners}function v(e,t,n,r){var i,o,s;if(h(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(i=p(e))>0&&s.length>i&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,console&&console.warn&&console.warn(u)}return e}function m(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function y(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=m.bind(r);return i.listener=n,r.wrapFn=i,i}function I(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):E(i,i.length)}function b(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function E(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function g(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function i(o){r.once&&e.removeEventListener(t,i),n(o)})}}Object.defineProperty(f,"defaultMaxListeners",{enumerable:!0,get:function(){return d},set:function(e){if("number"!=typeof e||e<0||l(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");d=e}}),f.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},f.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||l(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},f.prototype.getMaxListeners=function(){return p(this)},f.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)a(u,this,t);else{var l=u.length,f=E(u,l);for(n=0;n<l;++n)a(f[n],this,t)}return!0},f.prototype.on=f.prototype.addListener=function(e,t){return v(this,e,t,!1)},f.prototype.prependListener=function(e,t){return v(this,e,t,!0)},f.prototype.once=function(e,t){return h(t),this.on(e,y(this,e,t)),this},f.prototype.prependOnceListener=function(e,t){return h(t),this.prependListener(e,y(this,e,t)),this},f.prototype.off=f.prototype.removeListener=function(e,t){var n,r,i,o,s;if(h(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},f.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},f.prototype.listeners=function(e){return I(this,e,!0)},f.prototype.rawListeners=function(e){return I(this,e,!1)},f.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):b.call(e,t)},f.prototype.listenerCount=b,f.prototype.eventNames=function(){return this._eventsCount>0?o(this._events):[]},c.once=function(e,t){return new Promise(function(n,r){function i(n){e.removeListener(t,o),r(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",i),n([].slice.call(arguments))}g(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&g(e,"error",t,{once:!0})}(e,i)})};var w=setTimeout(function(){},0),T=function(){function e(e,t,n,r,i,o){this.interruptHandler=this.interrupt.bind(this),this.interruptHandlerInternal=function(){},this.initialized=!1,this.idle=!1,this.idler=e,this.beginCb=t,this.delay=n,this.duration=r,this.endCb=void 0===i?function(){}:i,this.timeoutId=w,this.durationTimeoutId=w,this.startIdle=o,this.init()}var t=e.prototype;return t.init=function(){var e=this;this.initialized||(this.initialized=!0,this.idle=!1,this.timeoutId=this.startIdle?setTimeout(function(){return e.beginIdleModeCycle()},0):setTimeout(function(){return e.testTimeout()},0))},t.isInitialized=function(){return this.initialized},t.clear=function(){this.initialized&&(this.interrupt(),clearTimeout(this.timeoutId),this.initialized=!1)},t.isIdle=function(){return this.idle},t.interrupt=function(){this.interruptHandlerInternal()},t.testTimeout=function(){var e=this;if(this.isInitialized()){var t=this.idler.getIdleTime();t>=this.delay?this.beginIdleModeCycle():this.timeoutId=setTimeout(function(){return e.testTimeout()},this.delay-t)}},t.beginIdleModeCycle=function(){var e=!1;this.interruptHandlerInternal=function(){e=!0},this.idler.on("interrupted",this.interruptHandler),this.beforeIdle(),this.idle=!0,this.beginCb(),e?this.endIdleModeCycle():this.interruptHandlerInternal=this.endIdleModeCycle.bind(this)},t.endIdleModeCycle=function(){var e=this;this.interruptHandlerInternal=function(){},this.idler.off("interrupted",this.interruptHandler),this.endCb(),this.idle=!1,this.afterIdle(),this.timeoutId=setTimeout(function(){return e.testTimeout()},this.delay)},t.beforeIdle=function(){var e=this;Number.isFinite(this.duration)&&this.duration>=0&&(this.durationTimeoutId=setTimeout(function(){return e.interrupt()},this.duration))},t.afterIdle=function(){clearTimeout(this.durationTimeoutId)},e}(),L=setInterval(function(){},0),_=function(e){function t(t,n,r,i,o,s,u,a){var l;return(l=e.call(this,t,n,r,i,u,a)||this).intervalId=L,l.intervalCb=o,l.interval=s,l}n(t,e);var r=t.prototype;return r.clear=function(){clearInterval(this.intervalId),e.prototype.clear.call(this)},r.beforeIdle=function(){e.prototype.beforeIdle.call(this),this.intervalId=setInterval(this.intervalCb,this.interval)},r.afterIdle=function(){clearInterval(this.intervalId),e.prototype.afterIdle.call(this)},t}(T),O=requestAnimationFrame(function(){}),C=function(e){function t(t,n,r,o,s,u,a,l,f){var c;return(c=e.call(this,t,n,r,o,u,a,l,f)||this).animationFrameRequestId=O,c.animateHandler=c.animate.bind(i(c)),c.animationCb=s,c}n(t,e);var r=t.prototype;return r.clear=function(){cancelAnimationFrame(this.animationFrameRequestId),e.prototype.clear.call(this)},r.beforeIdle=function(){e.prototype.beforeIdle.call(this),this.animationFrameRequestId=requestAnimationFrame(this.animateHandler)},r.animate=function(e){this.animationCb(e),this.animationFrameRequestId=requestAnimationFrame(this.animateHandler)},r.afterIdle=function(){cancelAnimationFrame(this.animationFrameRequestId),e.prototype.afterIdle.call(this)},t}(_);function x(){return s.performance.now()}var j={delay:6e4,duration:Number.POSITIVE_INFINITY,onBegin:function(){},onEnd:function(){},interval:Number.POSITIVE_INFINITY,onInterval:function(){},onAnimate:function(){},immediate:!1},H=function(e){function r(){var t;return(t=e.call(this)||this).lastId=0,t.timers=new Map,t.lastEventTimestampMs=x(),t.interruptHandler=t.interrupt.bind(i(t)),[].slice.call(arguments).forEach(function(e){return t.registerInterrupter(e)}),t}n(r,e);var o=r.prototype;return o.addCallback=function(e){if(void 0!==e.onAnimate){var n=t({},j,e),r=new C(this,n.onBegin,n.delay,n.duration,n.onAnimate,n.onInterval,n.interval,n.onEnd,n.immediate);return this.addIdleTimeout(r)}if(void 0!==e.interval&&Number.isFinite(e.interval)){var i=t({},j,e),o=new _(this,i.onBegin,i.delay,i.duration,i.onInterval,i.interval,i.onEnd,i.immediate);return this.addIdleTimeout(o)}var s=t({},j,e),u=new T(this,s.onBegin,s.delay,s.duration,s.onEnd,s.immediate);return this.addIdleTimeout(u)},o.addIdleTimeout=function(e){this.lastId+=1;var t=this.lastId;return this.timers.set(t,e),t},o.removeCallback=function(e){var t=this.timers.get(e);void 0!==t&&t.clear(),this.timers.delete(e)},o.clear=function(){this.timers.forEach(function(e){return e.clear()}),this.timers.clear()},o.interrupt=function(){this.lastEventTimestampMs=Math.max(x(),this.lastEventTimestampMs),this.emit("interrupted")},o.getIdleTime=function(){return x()-this.lastEventTimestampMs},o.registerInterrupter=function(e){return e.on("interrupted",this.interruptHandler),this},o.unregisterInterrupter=function(e){return e.off("interrupted",this.interruptHandler),this},r}(c.EventEmitter),M=function(e){function t(){var t;return(t=e.call(this)||this).emitInterruptedHandler=t.emitInterrupted.bind(i(t)),t}return n(t,e),t.prototype.emitInterrupted=function(){this.emit("interrupted")},t}(c.EventEmitter),F=function(e){function t(t){var n;return t((n=e.call(this)||this).emitInterruptedHandler),n}return n(t,e),t}(M);function P(e){return void 0!==e.on&&void 0!==e.off}function N(e){return null!=e&&"function"==typeof e[Symbol.iterator]}var R=function(e){function t(t,n){var r,i,o;return(r=e.call(this)||this).eventEmitters=new Set,r.eventTypes=new Set,void 0!==t&&(N(t)?(i=r).addEventEmitter.apply(i,t):r.addEventEmitter(t)),void 0!==n&&(N(n)?(o=r).addEventType.apply(o,n):r.addEventType(n)),r}n(t,e);var r=t.prototype;return r.addEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(!e.eventEmitters.has(t)){var n=e.wrapOn(t);e.eventTypes.forEach(n)}e.eventEmitters.add(t)}),this},r.removeEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(e.eventEmitters.has(t)){var n=e.wrapOff(t);e.eventTypes.forEach(n)}e.eventEmitters.delete(t)}),this},r.hasEventEmitter=function(e){return this.eventEmitters.has(e)},r.addEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)||e.eventEmitters.forEach(function(n){return e.wrapOn(n)(t)}),e.eventTypes.add(t)}),this},r.removeEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)&&e.eventEmitters.forEach(function(n){return e.wrapOff(n)(t)}),e.eventTypes.delete(t)}),this},r.hasEventType=function(e){return this.eventTypes.has(e)},r.wrapOn=function(e){var t=this;return P(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},r.wrapOff=function(e){var t=this;return P(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},t}(M),A=["keydown","keyup"],q=function(e){function t(t){return void 0===t&&(t=[document]),e.call(this,t,A)||this}return n(t,e),t}(R),z=["pointerdown","pointermove","pointerup"],S=["mousedown","mousemove","mouseup","touchstart","touchmove","touchend"],k=function(e){function t(n){return void 0===n&&(n=[document]),e.call(this,n,t.getEventTypes())||this}return n(t,e),t.getEventTypes=function(){return"function"==typeof window.PointerEvent?z:S},t}(R);e.CustomInterrupter=F,e.EventInterrupter=R,e.Idler=H,e.InterrupterBase=M,e.KeyboardInterrupter=q,e.PointerInterrupter=k});
//# sourceMappingURL=idler.umd.js.map

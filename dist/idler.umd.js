!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).idler={})}(this,function(e){function t(){return(t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function n(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,i(e,t)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var o,s=function(e){var t={exports:{}};return function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.PerformanceObserver=t.performance=void 0,t.performance=window.performance,t.PerformanceObserver=window.PerformanceObserver}(0,t.exports),t.exports}(),u="object"==typeof Reflect?Reflect:null,a=u&&"function"==typeof u.apply?u.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};o=u&&"function"==typeof u.ownKeys?u.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var l=Number.isNaN||function(e){return e!=e};function c(){c.init.call(this)}var f=c;c.EventEmitter=c,c.prototype._events=void 0,c.prototype._eventsCount=0,c.prototype._maxListeners=void 0;var h=10;function d(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function v(e){return void 0===e._maxListeners?c.defaultMaxListeners:e._maxListeners}function p(e,t,n,i){var r,o,s;if(d(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(r=v(e))>0&&s.length>r&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,console&&console.warn&&console.warn(u)}return e}function m(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function y(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=m.bind(i);return r.listener=n,i.wrapFn=r,r}function E(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):g(r,r.length)}function b(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function g(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function I(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function r(o){i.once&&e.removeEventListener(t,r),n(o)})}}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return h},set:function(e){if("number"!=typeof e||e<0||l(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");h=e}}),c.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},c.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||l(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},c.prototype.getMaxListeners=function(){return v(this)},c.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var i="error"===e,r=this._events;if(void 0!==r)i=i&&void 0===r.error;else if(!i)return!1;if(i){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var u=r[e];if(void 0===u)return!1;if("function"==typeof u)a(u,this,t);else{var l=u.length,c=g(u,l);for(n=0;n<l;++n)a(c[n],this,t)}return!0},c.prototype.on=c.prototype.addListener=function(e,t){return p(this,e,t,!1)},c.prototype.prependListener=function(e,t){return p(this,e,t,!0)},c.prototype.once=function(e,t){return d(t),this.on(e,y(this,e,t)),this},c.prototype.prependOnceListener=function(e,t){return d(t),this.prependListener(e,y(this,e,t)),this},c.prototype.off=c.prototype.removeListener=function(e,t){var n,i,r,o,s;if(d(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,r=o;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},c.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,o=Object.keys(n);for(i=0;i<o.length;++i)"removeListener"!==(r=o[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},c.prototype.listeners=function(e){return E(this,e,!0)},c.prototype.rawListeners=function(e){return E(this,e,!1)},c.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):b.call(e,t)},c.prototype.listenerCount=b,c.prototype.eventNames=function(){return this._eventsCount>0?o(this._events):[]},f.once=function(e,t){return new Promise(function(n,i){function r(n){e.removeListener(t,o),i(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}I(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&I(e,"error",t,{once:!0})}(e,r)})};var w=setTimeout(function(){},0),T=function(){function e(e,t,n,i,r){this.endHandler=this.handleEnd.bind(this),this.initialized=!1,this.idle=!1,this.idler=e,this.beginCb=t,this.delay=n,this.duration=i,this.endCb=void 0===r?function(){}:r,this.timeoutId=w,this.durationTimeoutId=w,this.init()}var t=e.prototype;return t.init=function(){var e=this;this.initialized||(this.initialized=!0,this.idle=!1,this.timeoutId=setTimeout(function(){return e.testTimeout()},0))},t.isInitialized=function(){return this.initialized},t.clear=function(){this.initialized&&(clearTimeout(this.timeoutId),this.isIdle()&&this.handleEnd(),this.initialized=!1)},t.isIdle=function(){return this.idle},t.testTimeout=function(){var e=this;if(this.isInitialized()){var t=this.idler.getIdleTime();t>=this.delay?this.handleBegin():this.timeoutId=setTimeout(function(){return e.testTimeout()},this.delay-t)}},t.handleBegin=function(){var e=this;this.idle=!0,this.idler.on("interrupted",this.endHandler),this.beginCb(),Number.isFinite(this.duration)&&this.duration>=0&&(this.durationTimeoutId=setTimeout(function(){return e.handleEnd()},this.duration))},t.handleEnd=function(){clearTimeout(this.durationTimeoutId),this.idler.off("interrupted",this.endHandler),this.idle=!1,this.endCb(),this.testTimeout()},e}(),L=setInterval(function(){},0),_=function(e){function t(t,n,i,r,o,s,u){var a;return(a=e.call(this,t,n,i,r,u)||this).intervalId=L,a.intervalCb=o,a.interval=s,a}n(t,e);var i=t.prototype;return i.clear=function(){clearInterval(this.intervalId),e.prototype.clear.call(this)},i.handleBegin=function(){e.prototype.handleBegin.call(this),this.intervalId=setInterval(this.intervalCb,this.interval)},i.handleEnd=function(){clearInterval(this.intervalId),e.prototype.handleEnd.call(this)},t}(T),O=requestAnimationFrame(function(){}),C=function(e){function t(t,n,i,o,s,u,a,l){var c;return(c=e.call(this,t,n,i,o,u,a,l)||this).animationFrameRequestId=O,c.animateHandler=c.animate.bind(r(c)),c.animationCb=s,c}n(t,e);var i=t.prototype;return i.clear=function(){cancelAnimationFrame(this.animationFrameRequestId),e.prototype.clear.call(this)},i.handleBegin=function(){e.prototype.handleBegin.call(this),this.animationFrameRequestId=requestAnimationFrame(this.animateHandler)},i.animate=function(e){this.animationCb(e),this.animationFrameRequestId=requestAnimationFrame(this.animateHandler)},i.handleEnd=function(){cancelAnimationFrame(this.animationFrameRequestId),e.prototype.handleEnd.call(this)},t}(_);function x(){return s.performance.now()}var j={delay:6e4,duration:Number.POSITIVE_INFINITY,onBegin:function(){},onEnd:function(){},interval:Number.POSITIVE_INFINITY,onInterval:function(){},onAnimate:function(){}},F=function(e){function i(){var t;return(t=e.call(this)||this).lastId=0,t.timers=new Map,t.lastEventTimestampMs=x(),t.interruptHandler=t.interrupt.bind(r(t)),[].slice.call(arguments).forEach(function(e){return t.registerInterrupter(e)}),t}n(i,e);var o=i.prototype;return o.addCallback=function(e){if(void 0!==e.onAnimate){var n=t({},j,e),i=new C(this,n.onBegin,n.delay,n.duration,n.onAnimate,n.onInterval,n.interval,n.onEnd);return this.addIdleTimeout(i)}if(void 0!==e.interval&&Number.isFinite(e.interval)){var r=t({},j,e),o=new _(this,r.onBegin,r.delay,r.duration,r.onInterval,r.interval,r.onEnd);return this.addIdleTimeout(o)}var s=t({},j,e),u=new T(this,s.onBegin,s.delay,s.duration,s.onEnd);return this.addIdleTimeout(u)},o.addIdleTimeout=function(e){this.lastId+=1;var t=this.lastId;return this.timers.set(t,e),t},o.removeCallback=function(e){var t=this.timers.get(e);void 0!==t&&t.clear(),this.timers.delete(e)},o.clear=function(){this.timers.forEach(function(e){return e.clear()}),this.timers.clear()},o.interrupt=function(){this.lastEventTimestampMs=Math.max(x(),this.lastEventTimestampMs),this.emit("interrupted")},o.getIdleTime=function(){return x()-this.lastEventTimestampMs},o.registerInterrupter=function(e){return e.on("interrupted",this.interruptHandler),this},o.unregisterInterrupter=function(e){return e.off("interrupted",this.interruptHandler),this},i}(f.EventEmitter),P=function(e){function t(){var t;return(t=e.call(this)||this).emitInterruptedHandler=t.emitInterrupted.bind(r(t)),t}return n(t,e),t.prototype.emitInterrupted=function(){this.emit("interrupted")},t}(f.EventEmitter);function H(e){return void 0!==e.on&&void 0!==e.off}function M(e){return null!=e&&"function"==typeof e[Symbol.iterator]}var N=function(e){function t(t,n){var i,r,o;return(i=e.call(this)||this).eventEmitters=new Set,i.eventTypes=new Set,void 0!==t&&(M(t)?(r=i).addEventEmitter.apply(r,t):i.addEventEmitter(t)),void 0!==n&&(M(n)?(o=i).addEventType.apply(o,n):i.addEventType(n)),i}n(t,e);var i=t.prototype;return i.addEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(!e.eventEmitters.has(t)){var n=e.wrapOn(t);e.eventTypes.forEach(n)}e.eventEmitters.add(t)}),this},i.removeEventEmitter=function(){var e=this;return[].slice.call(arguments).forEach(function(t){if(e.eventEmitters.has(t)){var n=e.wrapOff(t);e.eventTypes.forEach(n)}e.eventEmitters.delete(t)}),this},i.hasEventEmitter=function(e){return this.eventEmitters.has(e)},i.addEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)||e.eventEmitters.forEach(function(n){return e.wrapOn(n)(t)}),e.eventTypes.add(t)}),this},i.removeEventType=function(){var e=this;return[].slice.call(arguments).forEach(function(t){e.eventTypes.has(t)&&e.eventEmitters.forEach(function(n){return e.wrapOff(n)(t)}),e.eventTypes.delete(t)}),this},i.hasEventType=function(e){return this.eventTypes.has(e)},i.wrapOn=function(e){var t=this;return H(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},i.wrapOff=function(e){var t=this;return H(e)?function(n){return e.on(n,t.emitInterruptedHandler)}:function(n){return e.addEventListener(n,t.emitInterruptedHandler)}},t}(P),R=["keydown","keyup"],A=function(e){function t(t){return void 0===t&&(t=[document]),e.call(this,t,R)||this}return n(t,e),t}(N),B=["pointerdown","pointermove","pointerup"],q=["mousedown","mousemove","mouseup","touchstart","touchmove","touchend"],z=function(e){function t(n){return void 0===n&&(n=[document]),e.call(this,n,t.getEventTypes())||this}return n(t,e),t.getEventTypes=function(){return"function"==typeof window.PointerEvent?B:q},t}(N);e.EventInterrupter=N,e.Idler=F,e.InterrupterBase=P,e.KeyboardInterrupter=A,e.PointerInterrupter=z});
//# sourceMappingURL=idler.umd.js.map

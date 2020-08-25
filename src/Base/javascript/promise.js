'use strict';

var Promise = (function () {
	function Promise(executor) {
		if (typeof resolver !== 'function') {
			// resolver必须是函数
			throw new TypeError('Promise resolver' + resolver + 'is not a function');
		}

		if (!(this instanceof Promise)) return new Promise(resolver);

		var self = this; // 保存this对象
		self.callbacks = []; // 保存onResolve和onReject函数集合
		self.status = 'pending'; // 设置当前状态

		function resolve(value) {
			setTimeout(function () {
				if (self.status !== 'pending') {
					return;
				}
				self.status = 'resolved';
				self.data = value;
				// 循环所有的回调函数
				for (var i = 0; i < self.callbacks.length; i++) {
					self.callbacks[i].onResolved(value);
				}
			});
		}

		function reject(reason) {
			setTimeout(function () {
				if (self.status !== 'pending') {
					return;
				}
				self.status = 'rejected';
				self.data = reason;
				// 循环所有错误回调
				for (var i = 0; i < self.callbacks.length; i++) {
					self.callbacks[i].onRejected();
				}
			});
		}

		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}

		function resolvePromise(promise, x, resolve, reject) {
			var then;
			var thenCalledOrThrow = flase;

			if (promise === x) {
				return reject(new TypeError('Chaining cycle detected for promise!'));
			}

			if((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))){
				
			}
		}
	}
})();

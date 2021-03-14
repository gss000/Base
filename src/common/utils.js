/* 通用工具类 */

/**
 * 函数防抖
 */
export function debounce() {
	var timer = null;
	return function (fn, wait) {
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(fn, wait);
	};
}

/**
 * 函数节流
 */
export function throttle(fn, delay) {
	var lastTime = 0;
	return function () {
		var nowTime = new Date();
		if (nowTime - lastTime > delay) {
			fn.call(this);
			lastTime = nowTime;
		}
	};
}

/**
 * sleep函数
 */
export const sleep = delay => new Promise(resolve => setTimeout(resolve));

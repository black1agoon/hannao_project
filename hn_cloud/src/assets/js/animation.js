export function animate({
                          endPos,   // 0
                          duration, // 动画时间
                          setValue, // 滚动距离?
                          cb = function () {  // callback
                          },
                          startPos = 0,   // 开始的位置
                          easing = 'easeIn' // 动画函数
                        } = {}) {
  function run() {
    if (_step(startPos, endPos, startTime, duration, easing, setValue) === false) {
      clearRAF(id);
      cb();
    } else {
      rAF(run);
    }
  }
  const startTime = Date.now();
  const id = rAF(run);
}

export const rAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
export const clearRAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

function _step(startPos, endPos, startTime, duration, easing, setValue) {
  const curTime = Date.now();
  if (curTime >= startTime + duration) {
    setValue(endPos);
    return false;
  }
  const pos = _tween[easing](curTime - startTime, startPos, endPos - startPos, duration);
  setValue(pos);
}
/**
 * t: 当前时间 - 开始时间
 * b: 开始位置
 * c: 结束位置 - 开始位置
 * d: 动画执行时间
 * @private
 */
const _tween = {
  linear(t, b, c, d) {
    return c * t / d + b;
  },
  easeIn(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }
};

export function scrollY(val) {
  const root = document.documentElement || document.body.parentNode || document.body;
  if (val !== undefined) {
    root.scrollTop = val;
  } else {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : root.scrollTop;
  }
}
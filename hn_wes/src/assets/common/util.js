import config from '@/config'
/**
 *
 * @param date  ← let date = new date()对象
 * @param fmt   ← "yyyy-MM-dd hh:mm"
 * @return "2018-03-03 13:55"
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 *
 * @param id
 * @param tag
 * @param heigh
 * @param speed
 * @param delay
 */
export function singleScroll(el, heigh, speed, delay) {
  let me = this
  me.EL = el
  me.PA = 0
  me.TI = null
  me.LH = heigh
  me.SP = speed
  me.DY = delay
  me.CH = me.EL.children.length * me.LH
  me.initScroll = function() {
    clearInterval(me.TI)
  }
  me.exec = function () {
    if (me.PA) return
    me.EL.scrollTop += 1
    if (me.EL.scrollTop % me.LH === 0)  {
      clearInterval(me.TI)
      if (me.EL.scrollTop >= me.CH) {
        me.EL.scrollTop = 0
      }
      setTimeout(function() {
        me.TI = setInterval(me.exec, me.SP)
      }, me.DY * 1000)
    }
  }
  me.start = function () {
    if (me.EL.scrollHeight - me.EL.offsetHeight >= me.LH) {
      me.EL.innerHTML += me.EL.innerHTML
      me.TI = setInterval(me.exec, me.SP)
    }
  }
  me.EL.onmouseover = function () {
    me.PA = 1
  }
  me.EL.onmouseout = function () {
    me.PA = 0
  }
  setTimeout(me.start, me.DY * 1000)
}


export function getImgSrc(url) {
  return config.erpURI + url
}




import config from '@/config'
export function getImgUrl(name) {
  return `${config.serverURI}/upload/HkUpload/${name}.jpg`
}
export function getImgPath(url) {
  return config.serverURI + url
}

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
      // console.log(RegExp.$1, str)
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function setNumberByThree(num) { // 取整，三行逗号隔开
                                        // return parseFloat(num_s).toLocaleString()
  num = Math.floor(num) // 向下取整
  num = num.toString()
  let len = num.length
  let r = len % 3
  if (len <= 3) {
    return num
  }
  num = r > 0 ? num.slice(0, r) + "," + num.slice(r, len).match(/\d{3}/g).join(",") : num.slice(r, len).match(/\d{3}/g).join(",")
  return num
}
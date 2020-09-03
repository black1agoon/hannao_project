export function getCommaNumber(num) {
  if (num) {
    num += ''
    let x = num.split('.')
    let x1 = x[0]
    let x2 = x.length > 1 ? '.' + x[1] : ''
    let rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
  } else {
    return 0
  }
}

export function getFormatDate(date) {
  if (date) {
    let list = date.split(' ')[0].split('-')
    return list[1].replace(/^0+/, '') + '月' + list[2].replace(/^0+/, '') + '日'
  } else {
    return ''
  }
}

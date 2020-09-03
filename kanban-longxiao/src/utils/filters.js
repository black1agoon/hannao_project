const formatNum = function (n) {
  return new Intl.NumberFormat().format(n)
}

export default {
  formatNum,
}

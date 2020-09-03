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

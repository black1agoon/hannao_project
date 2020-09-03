export const gcd = function (a, b) {
  a = Math.abs(a)
  b = Math.abs(b)
  while (a !== b) {
    if (a > b) {
      a -= b
    } else {
      b -= a
    }
  }
  return a
}

export const gcdOfArray = function (arr) {
  arr = arr.slice().sort()
  let min = arr[0]
  arr.find(n => {
    if (n % min) {
      min = gcd(min, n)
      return min === 1
    } else {
      return false
    }
  })
  return min
}

/**
 * Fixed number length
 * @param number
 * @param length
 * @param unitList
 * @returns {{p: number, unit: number, value: string}|{p: number, unit: number, value: number}}
 */
export const fixLength = function (number, length, unitList) {
  const len = Math.ceil(Math.log10(number + 1))
  const p = Math.floor(len / (3 + 1))
  const fra = length - (len - 3 * p)
  const maxP = unitList && unitList.length || 10
  return p > maxP ? {
    value: (number / 10 ** (len - 1)).toFixed(length - 3) + 'E' + (len - 1),
    unit: unitList && unitList[0] || 1,
    p: 0,
  } : {
    value: +(number / 1000 ** p).toFixed(fra > 0 ? fra : 0),
    unit: unitList && unitList[p] || 1000 ** p,
    p,
  }
}
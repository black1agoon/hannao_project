/**
 * Convert camelCase to kebab-case
 * @param name
 */
export const camel2kebab = function(name: string) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
};

/**
 * 随机字符串
 * @param len 长度
 * @param prefix 前缀
 */
export function randomString (len: number, prefix: string) {
  let str = prefix || ''
  const availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_1234567890'
  for (let i = 0; i < len; i++) {
    str += availableChars.charAt(Math.floor(Math.random() * availableChars.length))
  }
  return str
}

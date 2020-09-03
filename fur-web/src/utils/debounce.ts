/**
 * Debounce a function with a timeout
 * @param func
 * @param timeout
 * @returns {Function}
 */
export function debounce (func: Function, timeout: number) {
  let timeoutId: number | null = null
  let result: any = undefined
  return (...args: any) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        timeoutId = null
      }, timeout)
      if (result instanceof Promise) {
        return Promise.reject('waiting')
      }
      return
    }
    timeoutId = window.setTimeout(() => {
      timeoutId = null
    }, timeout)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    result = func.apply(this, args)
    return result
  }
}

/**
 * Debounce a function with a timeout
 * @param func
 * @param timeout
 * @returns {Function}
 */
export function debounceError (func: Function, timeout: number) {
  let timeoutId: number | null = null
  let result: any = undefined
  const errorCodes: Set<string> = new Set()
  return (code: string, ...args: any) => {
    if (timeoutId && errorCodes.has(code)) {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => {
        timeoutId = null
        errorCodes.clear()
      }, timeout)
      if (result instanceof Promise) {
        return Promise.reject('waiting')
      }
      return
    }
    if (!timeoutId) {
      timeoutId = window.setTimeout(() => {
        timeoutId = null
        errorCodes.clear()
      }, timeout)
    }
    errorCodes.add(code)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    result = func.apply(this, args)
    return result
  }
}

export default debounce

/**
 * A way to build a function where `this` is guaranteed
 * to be in the global scope, so we can compare it against
 * `window`.
 */
const isBrowser: boolean = (new Function(`
try {
  return this === window
} catch (_) {
  return false
}
`))()

const isTTY = (() => {
  try {
    return process.stdin.isTTY
  } catch (_) {
    return false
  }
})()

const colorPrefix = isTTY ? '\x1b[1;30m' : ''
const colorSuffix = isTTY ? '\x1b[0m' : ''
const traceIndentString = '    at '

class EnvironmentHelper {
  static formatTrace(trace: string, withMessage = false) {
    const messageSeparator = withMessage ? ' -' : ''
    return colorPrefix + trace + messageSeparator + colorSuffix;
  }

  static fileAndLineInfo(line: string) {
    return line
      .replaceAll('file://', '')
      .match(/\((.*?)\)?$/)![1]
      .replace(process.cwd(), '.')
  }

  static buildLogArgs(traceLine: string, message?: string) {
    const args = [this.formatTrace(this.fileAndLineInfo(traceLine), !!message)]
    if (!!message) args.push(message)

    return args
  }
}

export function logWithLineInfo(message?: string) {
  if (isBrowser) return console.log(message)

  const callerTraceLine = new Error().stack!
    .split('\n')
    .filter(line => line.startsWith(traceIndentString))[1]

  console.log(...EnvironmentHelper.buildLogArgs(callerTraceLine, message))
}

export default logWithLineInfo
const chai = require('chai')
const Sinon = require('sinon')
const sinonChai = require('sinon-chai')

const { logWithLineInfo } = require('../../dist/cjs/index')

chai.use(sinonChai)
const expect = chai.expect
const specFilePattern = '\\./spec/cjs/index\\.spec\\.cjs:\\d+:\\d+'
const matchers = {
  colorNoMessage: RegExp(`^\x1b\\[1;30m${specFilePattern}\x1b\\[0m$`),
  colorWithMessage: RegExp(`^\x1b\\[1;30m${specFilePattern} \\-\x1b\\[0m$`),
}

describe('commonjs', () => {
  const stub = Sinon.stub(console, 'log').callsFake(() => { })

  beforeEach(() => {
    Sinon.reset()
  })

  after(() => {
    Sinon.restore()
  })

  it('if provided a message, logs both line and message', () => {
    logWithLineInfo('some message')

    expect(stub).to.have.been.calledWithMatch(
      matchers.colorWithMessage,
      'some message',
    )
  })

  it('if not provided a message, just logs line info', () => {
    logWithLineInfo()
    expect(stub).to.have.been.calledWithMatch(
      matchers.colorNoMessage,
    )
  })
})

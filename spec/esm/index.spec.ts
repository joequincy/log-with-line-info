import chai, { expect } from 'chai'
import Sinon from 'sinon'
import sinonChai from 'sinon-chai'

import logWithLineInfo from '../../dist/esm/index'

chai.use(sinonChai)
const specFilePattern = '\\./spec/esm/index\\.spec\\.ts:\\d+:\\d+'
const matchers = {
  colorNoMessage: RegExp(`^\x1b\\[1;30m${specFilePattern}\x1b\\[0m$`),
  colorWithMessage: RegExp(`^\x1b\\[1;30m${specFilePattern} \\-\x1b\\[0m$`),
  plainNoMessage: RegExp(specFilePattern),
  plainWithMessage: RegExp(`${specFilePattern} \\-`),
}

describe('esm', () => {
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
      process.stdin.isTTY ? matchers.colorWithMessage : matchers.plainWithMessage,
    )
  })

  it('if not provided a message, just logs line info', () => {
    logWithLineInfo()
    expect(stub).to.have.been.calledWithMatch(
      process.stdin.isTTY ? matchers.colorNoMessage : matchers.plainNoMessage,
    )
  })
})

/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 * @jest-environment node
 */
const { fixture } = require('./helper')
const compiler = require('./compiler')

describe('lessModifyVarLoader', function() {
  it('should output normally', async function() {
    let stats = await compiler('dir/main.less')
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(
      `"module.exports = \\"body {\\\\n  width: 100px;\\\\n  height: 100px;\\\\n  color: blue;\\\\n}\\\\n\\""`
    )
  })

  it('should inferred closest _override.less', async function() {
    let stats = await compiler('dir/main.less', { filePath: '_override.less' })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(
      `"module.exports = \\"body {\\\\n  width: 100px;\\\\n  height: 100px;\\\\n  color: red;\\\\n}\\\\n\\""`
    )
  })

  it('should inferred closest _override.less in dir/dir', async function() {
    let stats = await compiler('dir/dir/main.less', { filePath: '_override.less' })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(
      `"module.exports = \\"body {\\\\n  width: 100px;\\\\n  height: 100px;\\\\n  color: brown;\\\\n}\\\\n\\""`
    )
  })

  it('should use specific _override.less', async function() {
    let stats = await compiler('dir/main.less', { filePath: fixture('_override.less') })
    const output = stats.toJson().modules[0].source
    expect(output).toMatchInlineSnapshot(
      `"module.exports = \\"body {\\\\n  width: 100px;\\\\n  height: 1px;\\\\n  color: yellow;\\\\n}\\\\n\\""`
    )
  })
})

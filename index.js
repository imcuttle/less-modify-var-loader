/**
 * @file index
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2018/11/12
 *
 */
const findUp = require('find-up')
const nps = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')

function lessReplaceLoader(lessText) {
  const options = Object.assign(
    {
      filePath: '_replace.less'
    },
    loaderUtils.getOptions(this)
  )
  if (typeof options.filePath !== 'string') {
    throw new TypeError(`Expect options.filePath string, but ${typeof options.filePath}`)
  }

  if (this.cacheable) {
    this.cacheable()
  }

  const dirname = nps.dirname(this.resourcePath)
  const load = filename => {
    if (this.resourcePath === filename) {
      return lessText
    }
    return `${lessText}\n@import (reference) ${JSON.stringify(nps.relative(dirname, filename))};`
  }

  if (nps.isAbsolute(options.filePath) && fs.statSync(options.filePath).isFile()) {
    return load(options.filePath)
  }

  return findUp(options.filePath, { cwd: dirname }).then(filename => {
    if (!filename) {
      return lessText
    }
    return load(filename)
  })
}

module.exports = lessReplaceLoader

const path = require('path')
const webpack = require('webpack')
const Memoryfs = require('memory-fs')

module.exports = (fixture, options) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./fixture/${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            // 'css-loader',
            'raw-loader',
            {
              loader: 'less-loader'
            },
            {
              loader: require.resolve('../'),
              options
            }
          ]
        }
      ]
    }
  })

  compiler.outputFileSystem = new Memoryfs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) reject(err || stats.compilation.errors[0])

      resolve(stats)
    })
  })
}

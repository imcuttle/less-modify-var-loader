# less-modify-var-loader

[![Build status](https://img.shields.io/travis/imcuttle/less-modify-var-loader/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/less-modify-var-loader)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/less-modify-var-loader.svg?style=flat-square)](https://codecov.io/github/imcuttle/less-modify-var-loader?branch=master)
[![NPM version](https://img.shields.io/npm/v/less-modify-var-loader.svg?style=flat-square)](https://www.npmjs.com/package/less-modify-var-loader)
[![NPM Downloads](https://img.shields.io/npm/dm/less-modify-var-loader.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/less-modify-var-loader)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> The webpack loader for better replace less variables.

- `vars.less`

```less
@width: 100px;
@height: 100px;
@color: blue;
```

- `style.less`

```less
@import (reference) './vars.less';

body {
  width: @width;
  height: @height;
  color: @color;
}
```

- `_replace.less`

```less
@color: red;
```

- **Output**

```
body {
  width: 100px;
  height: 100px;
  color: red;
}
```

## Installation

```bash
npm install less-modify-var-loader -D
# or use yarn
yarn add less-modify-var-loader --dev
```

## Usage

```javascript
// ...
module: {
  rules: [
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader'
        },
        {
          loader: 'less-modify-var-loader'
        }
      ]
    }
  ]
}
```

### Options

#### `filePath`

The path of overriding less file, it could be inferred as the closest file from less file, or assigning special file path by absolute path.

- **Type**: `string`
- **Default**: `_replace.less`

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:moyuyc95@gmail.com">moyuyc95@gmail.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟

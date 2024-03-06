const jsxTransform = require('babel-plugin-jsx-dom-expressions')
const preprocess = require('./preprocess')

const jsxTransformObj = jsxTransform()

export default () => {
  return {
    ...jsxTransformObj,
    visitor: {
      ...jsxTransformObj.visitor,
      Program: {
        enter: preprocess,
        exit: jsxTransformObj.visitor.Program.exit,
      },
    },
  }
}

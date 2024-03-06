import * as t from '@babel/types'

const { isValidHTMLNesting } = require('validate-html-nesting')

const config = {
  moduleName: 'dom',
  generate: 'dom',
  hydratable: false,
  delegateEvents: true,
  delegatedEvents: [],
  builtIns: [],
  requireImportSource: false,
  wrapConditionals: true,
  omitNestedClosingTags: false,
  contextToCustomElements: false,
  staticMarker: '@once',
  effectWrapper: 'effect',
  memoWrapper: 'memo',
  validate: true,
  tagCollector: (tagName) => {},
}

function isComponent(tagName) {
  return (
    (tagName[0] && tagName[0].toLowerCase() !== tagName[0]) || tagName.includes('.') || /[^a-zA-Z]/.test(tagName[0])
  )
}

// From https://github.com/MananTank/babel-plugin-validate-jsx-nesting/blob/main/src/index.js
const JSXValidator = {
  JSXElement(path) {
    const elName = path.node.openingElement.name
    const parent = path.parent
    if (!t.isJSXElement(parent) || !t.isJSXIdentifier(elName)) return
    const elTagName = elName.name
    if (isComponent(elTagName)) return
    const config = path.hub.file.metadata.config
    if (typeof config.tagCollector === 'function') {
      config.tagCollector(elTagName)
    }
    const parentElName = parent.openingElement.name
    if (!t.isJSXIdentifier(parentElName)) return
    const parentElTagName = parentElName.name
    if (!isComponent(parentElTagName)) {
      if (!isValidHTMLNesting(parentElTagName, elTagName)) {
        throw path.buildCodeFrameError(`Invalid JSX: <${elTagName}> cannot be child of <${parentElTagName}>`)
      }
    }
  },
}

export default (path, { opts }) => {
  const merged = (path.hub.file.metadata.config = Object.assign({}, config, opts))
  const lib = merged.requireImportSource
  if (lib) {
    const comments = path.hub.file.ast.comments
    let process = false
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i]
      const index = comment.value.indexOf('@jsxImportSource')
      if (index > -1 && comment.value.slice(index).includes(lib)) {
        process = true
        break
      }
    }
    if (!process) {
      path.skip()
      return
    }
  }
  if (merged.validate) path.traverse(JSXValidator)
}

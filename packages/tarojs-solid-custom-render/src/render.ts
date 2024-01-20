import { createRenderer } from 'solid-js/universal'
import { document, TaroElement, TaroNode, TaroText } from '@tarojs/runtime'
import { setProperty } from './utils'
import { h } from './h'
export const {
  render,
  effect,
  memo,
  createComponent: _createComponent,
  createElement,
  createTextNode,
  insertNode,
  insert,
  spread,
  setProp,
  mergeProps,
  use
} = createRenderer<TaroNode>({
  createElement(type: string) {
    return document.createElement(type)
  },
  createTextNode(text) {
    return document.createTextNode(text)
  },
  replaceText(textNode: TaroText, value) {
    textNode.textContent = value
  },
  setProperty(node: TaroElement, name: string, value, prev) {

    setProperty(node, name, value, prev)
  },
  insertNode(parent, node, anchor) {
    parent.insertBefore(node, anchor)
  },
  isTextNode(node: TaroNode) {
    if (typeof node === 'string') {
      return true
    }
    return node instanceof TaroText
  },
  removeNode(parent: TaroElement, node: TaroElement) {
    parent.removeChild(node)
  },
  getParentNode(node: TaroNode) {
    return node.parentNode || undefined
  },
  getFirstChild(node: TaroElement) {
    return node.firstChild || undefined
  },
  getNextSibling(node: TaroElement) {
    return node.nextSibling || undefined
  },
})

export const createComponent = (type, props) => {
  if (typeof type === 'string') {
    return h(type, props)
  }
  return _createComponent(type, props)
}

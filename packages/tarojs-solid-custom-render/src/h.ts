import { TaroNode } from '@tarojs/runtime'
import { createRenderEffect, splitProps, children as solidChildren, Accessor } from 'solid-js'
import { ResolvedChildren } from 'solid-js/types/reactive/signal'
import { createElement, createTextNode, insert, insertNode, setProp } from './render'

export type Component = (props?: any) => TaroNode

type Children =
  | undefined
  | string
  | number
  | TaroNode
  | TaroNode[]
  | Component
  | Component[]
  | Accessor<ResolvedChildren>
  | (() => Component[])

export function h (com: string, props?: any, children?: Children) {
  if (typeof com !== 'string') {
    throw Error(`h function cant create ele for ${com}`)
  }
  const ele = createElement(com)
  const [local, otherProps] = splitProps(props, ['ref', 'children'])

  for (const key in otherProps) {
    setProp(ele, key, otherProps[key])
  }

  if (local.ref) {
    createRenderEffect(() => {
      if (typeof local.ref === 'function') {
        local.ref(ele)
      } else {
        local.ref = ele
      }
    })
  }

  // get 的处理
  if (local.hasOwnProperty('children')) {
    const descriptor = Object.getOwnPropertyDescriptor(local, 'children')
    if (descriptor?.get) {
      children = solidChildren(() => local.children)
    } else {
      children = local.children
    }
  }
  insertNodes(ele, children)

  return ele
}


function insertNodes (parent: TaroNode, children: Children) {
  if (children === undefined) {
    return
  }

  let list = [] as TaroNode[] | (() => TaroNode)[]
  if (!Array.isArray(children)) {
    list = [children] as TaroNode[] | (() => TaroNode)[]
  } else {
    list = children
  }
  for (let i = 0; i < list.length; i++) {
    const child = list[i]
    const type = typeof child
    if (type === 'function') {
      insert(parent, child, null)
      continue
    }
    if (Array.isArray(child)) {
      insertNodes(parent, child)
      continue
    }

    if (child instanceof TaroNode) {
      insertNode(parent, child)
      continue
    }

    if (type === 'string') {
      const node = createTextNode(child as unknown as string)
      insertNode(parent, node)
      continue
    }

    if (type === 'number' || type === 'boolean' || child instanceof Date || child instanceof RegExp) {
      const node = createTextNode(child.toString())
      insertNode(parent, node)
      continue
    }
  }
}

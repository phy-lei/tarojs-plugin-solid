import { TaroElement } from '@tarojs/runtime'
import {
  capitalize,
  internalComponents,
  isFunction,
  toCamelCase,
} from '@tarojs/shared'

interface DangerouslySetInnerHTML {
  __html?: string
}
type ClassList = { [key: string]: boolean };

function isEventName(s: string) {
  return s.startsWith('on')
}

export function setProperty(
  dom: TaroElement,
  name: string,
  value: any,
  oldValue?: any
) {

  if (name === 'key' || name === 'children' || name === 'ref') {
    // skip
  } else if (name === 'classList') {
    const map = diffClassList(value as ClassList, oldValue as ClassList)
    for (const key in map) {
      if (key === '') {
        continue
      }
      if (map[key]) {
        (dom as any).classList.add(key)
      } else {
        (dom as any).classList.remove(key)
      }
    }
  } else if (isEventName(name)) {
    setEvent(dom, name, value, oldValue)
  } else if (name === 'dangerouslySetInnerHTML') {
    const newHtml = (value as DangerouslySetInnerHTML)?.__html ?? ''
    const oldHtml = (oldValue as DangerouslySetInnerHTML)?.__html ?? ''
    if (newHtml || oldHtml) {
      if (oldHtml !== newHtml) {
        dom.innerHTML = newHtml
      }
    }
  } else if (!isFunction(value)) {
    if (value == null) {
      dom.removeAttribute(name)
    } else {
      dom.setAttribute(name, value as string)
    }
  }
}

function diffClassList(newVal: ClassList, oldVal: ClassList) {
  const result: ClassList = {}
  for (const key in oldVal) {
    if (newVal[key] !== oldVal[key]) {
      result[key] = newVal[key]
    }
  }
  for (const key in newVal) {
    if (result.hasOwnProperty(key)) {
      continue
    }
    result[key] = newVal[key]
  }
  return result
}

function setEvent(
  dom: TaroElement,
  name: string,
  value: unknown,
  oldValue?: unknown
) {
  const isCapture = name.endsWith('Capture')
  let eventName = name.toLowerCase().slice(2)
  if (isCapture) {
    eventName = eventName.slice(0, -7)
  }

  const compName = capitalize(toCamelCase(dom.tagName.toLowerCase()))

  if (eventName === 'click' && compName in internalComponents) {
    eventName = 'tap'
  }

  if (isFunction(value)) {
    if (oldValue) {
      dom.removeEventListener(eventName, oldValue as any, false)
      dom.addEventListener(eventName, value, { isCapture, sideEffect: false })
    } else {
      dom.addEventListener(eventName, value, isCapture)
    }
  } else {
    dom.removeEventListener(eventName, oldValue as any)
  }
}


import { capitalize, internalComponents, toCamelCase } from '@tarojs/shared'

let componentConfig
try {
  componentConfig = require('@tarojs/webpack5-runner/dist/template/component').componentConfig
} catch {
  // 兼容 Taro 3.6.5 版本
  componentConfig = require('@tarojs/webpack5-runner/dist/utils/component').componentConfig
}

if (!componentConfig) {
  throw new Error('The plugin does not support the current version of Taro')
}

interface ILoaderMeta {
  importFrameworkStatement: string
  mockAppStatement: string
  frameworkArgs: string
  creator: string
  creatorLocation: string
  importFrameworkName: string
  isNeedRawLoader?: boolean
  extraImportForWeb?: string
  execBeforeCreateWebApp?: string
  compatComponentImport?: string
  compatComponentExtra?: string
  modifyConfig?: (config: Record<string, any>, source: string) => void
}

function extractCreateElementTags (code: string) {
  const regex = /_\$createElement\s*\(\s*(['"])?(.*?)\1\s*\)/g
  const matches = []
  let match

  while ((match = regex.exec(code)) !== null) {
    if (match[2]) { // 检查是否有内容
      matches.push(match[2].replace(/"/g, '')) // 移除双引号
    }
  }

  return matches
}

function modifyComponentConfig (source) {
  const res = extractCreateElementTags(source)

  res.forEach((name) => {
    if (capitalize(toCamelCase(name)) in internalComponents) {
      // 收集小程序模板中需要渲染的组件
      componentConfig.includes.add(name)
    }
  })
  return {}
}

export function getLoaderMeta (): ILoaderMeta {
  return {
    importFrameworkStatement: ``,
    mockAppStatement: ``,
    frameworkArgs: 'config',
    creator: 'createSolidApp',
    creatorLocation: 'tarojs-plugin-solid/dist/runtime',
    importFrameworkName: '',
    compatComponentImport: '',
    compatComponentExtra: '',
    modifyConfig (_, source) {
      modifyComponentConfig(source)
    }
  }
}

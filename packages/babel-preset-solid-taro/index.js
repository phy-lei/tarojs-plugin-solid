const { capitalize, internalComponents, toCamelCase } = require('@tarojs/shared')

const jsxTransform = require('./babel-plugin-jsx-dom-expressions')

let componentConfig
try {
  componentConfig = require('@tarojs/webpack5-runner/dist/template/component').componentConfig
} catch {
  // 兼容 Taro 3.6.5 版本
  componentConfig = require('@tarojs/webpack5-runner/dist/utils/component').componentConfig
}

module.exports = function (context, options = {}) {
  const plugins = [
    [
      jsxTransform,
      Object.assign(
        {
          moduleName: 'solid-js/web',
          builtIns: [
            'For',
            'Show',
            'Switch',
            'Match',
            'Suspense',
            'SuspenseList',
            'Portal',
            'Index',
            'Dynamic',
            'ErrorBoundary'
          ],
          contextToCustomElements: true,
          wrapConditionals: true,
          generate: 'dom',
          tagCollector: tag => {
            if (capitalize(toCamelCase(tag)) in internalComponents) {
              // 收集小程序模板中需要渲染的组件
              componentConfig.includes.add(tag)
            }
          }
        },
        options
      )
    ]
  ]

  return {
    plugins
  }
}

# babel-preset-solid-taro
babel-preset-solid的babel插件，继承自babel-plugin-jsx-dom-expressions拓展，新增收集tagName的功能。

## 配置项
普通配置项查看[babel-preset-solid](https://github.com/solidjs/solid/blob/main/packages/babel-preset-solid/README.md)
新增配置：
```js
// babel.config.js
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'solid',
        ts: true,
      },
    ],
    // 设置自定义custom-render编译
    [
      'babel-preset-solid-taro',
      {
        moduleName: 'tarojs-solid-custom-render',
        generate: 'universal',
        tagCollector: (tagName) => {
          // 收集到用到的html标签
        }
      },
    ],
  ],
}
```

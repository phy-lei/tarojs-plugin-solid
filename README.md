<h1 align="center">Taro Plugin Solid</h1>

<p align="center">使用 Solid 开发小程序。</p>

![这是图片](https://github.com/phy-lei/tarojs-plugin-solid/pic/example.gif)

# 示例cli
可以用此空白模板[github](https://github.com/phy-lei/taro-solid-cli)作为你项目起始点。

# 安装与使用
可以先使用taro创建一个项目模板，[Taro 安装及使用](https://docs.taro.zone/docs/GETTING-STARTED)。

### 安装插件
```bash
pnpm add tarojs-plugin-solid tarojs-solid-custom-render
```
当然了还需要安装solid-js。
```bash
pnpm add solid-js
```

### 配置
1.在 Taro 项目的 `config/index.ts` 中修改配置，将 `framework` 更改为 `solid`。

```ts
const config = {
    framework: 'solid',
    plugins: ['tarojs-plugin-solid'],
}
```

2.修改babel的配置，将solid的自定义render器加入preset。
```js
module.exports = {
  presets: [
    [
      "taro",
      {
        framework: "solid",
        ts: true,
      },
    ],
    // 设置自定义custom-render编译
    [
      "babel-preset-solid",
      {
        moduleName: "tarojs-solid-custom-render",
        generate: "universal",
      },
    ],
  ],
};
```

# License
[MIT](./LICENSE)

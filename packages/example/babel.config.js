// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
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

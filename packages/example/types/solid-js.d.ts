import '../node_modules/tarojs-plugin-solid/types/taro-components-solid'


declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any];
    }
  }
}

import '../node_modules/tarojs-plugin-solid/types/taro-components-solid.d.ts'

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any];
    }
  }
}

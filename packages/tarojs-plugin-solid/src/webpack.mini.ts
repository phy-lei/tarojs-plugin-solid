import { getLoaderMeta } from './loader-meta'

export function modifyMiniWebpackChain (chain) {

  // chain.module
  //     .rule('solid')
  //     .test(/\.(ts)x?$/)
  //     .use('babelLoader')
  //     .loader(require('babel-loader'))
  //     .options({
  //         emitCss: true,
  //         babelrc: false,
  //         configFile: false,
  //         presets: ['@babel/preset-env', 'solid', '@babel/preset-typescript'],
  //         plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
  //     })

  chain.plugin('miniPlugin')
    .tap(args => {
      args[0].loaderMeta = getLoaderMeta()
      return args
    })
}

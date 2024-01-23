import { getLoaderMeta } from './loader-meta'

export function modifyMiniWebpackChain (chain) {

  chain.plugin('miniPlugin')
    .tap(args => {
      args[0].loaderMeta = getLoaderMeta()
      return args
    })
}

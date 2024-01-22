import { getLoaderMeta } from './loader-meta'

export function modifyH5WebpackChain (chain) {
  chain.merge({
    module: {
      rule: {
        'process-import-taro': {
          test: /taro-h5[\\/]dist[\\/]index/,
          loader: require.resolve('./api-loader'),
        },
      },
    },
  })


  chain.plugin('mainPlugin')
    .tap(args => {
      args[0].loaderMeta = getLoaderMeta()
      return args
    })
}

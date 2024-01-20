import type { IPluginContext } from '@tarojs/service'
import { modifyH5WebpackChain } from './webpack.h5'
import { modifyMiniWebpackChain } from './webpack.mini'

try {
    const configSchema = require('@tarojs/cli/dist/doctor/configSchema')
    const Joi = require('joi')

    configSchema.default.$_terms.keys.forEach(term => {
        if (term.key === 'framework') {
            term.schema = Joi.any().valid('nerv', 'react', 'preact', 'vue', 'vue3', 'solid').required()
        }
    })
} catch {
    // ignore
}

export default (ctx: IPluginContext) => {
    const { framework } = ctx.initialConfig
    if ((framework as (typeof framework) | 'solid') !== 'solid') {
        return
    }

    ctx.modifyWebpackChain(({ chain }) => {
        chain
            .plugin('definePlugin')
            .tap(args => {
                const config = args[0]
                config.__TARO_FRAMEWORK__ = `"${framework}"`
                return args
            })

        if (process.env.TARO_ENV === 'h5') {
            modifyH5WebpackChain(chain)
        } else {
            modifyMiniWebpackChain(chain)
        }
    })

    ctx.modifyRunnerOpts(({ opts }) => {
        if (!opts.compiler) {
            return
        }

        if (typeof opts.compiler === 'string') {
            opts.compiler = {
                type: opts.compiler
            }
        }

        const { compiler } = opts

        if (compiler.type === 'webpack5') {
            // 提供给 webpack5 依赖预编译收集器的第三方依赖
            const deps = ["tarojs-plugin-solid/dist/runtime"]
            compiler.prebundle ||= {}
            const prebundleOptions = compiler.prebundle
            prebundleOptions.include ||= []
            prebundleOptions.include = prebundleOptions.include.concat(deps);
            prebundleOptions.exclude ||= []

            prebundleOptions.esbuild ||= {}
            const esbuildConfig = prebundleOptions.esbuild
            esbuildConfig.plugins ||= []
        }
    })
}

import buble from '@rollup/plugin-buble'
import * as path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { externals } from 'rollup-plugin-node-externals'
import ts from 'rollup-plugin-ts'

let workspace = __dirname
const pluginWorkspace = path.resolve(workspace, '../tarojs-plugin-solid')
// 统一打包到插件里 暂时有问题
if(process.argv[process.argv.length - 1] === 'all_in_one') {
  workspace = pluginWorkspace
}

const base = {
  input: path.join(__dirname, 'src/index.ts'),
  plugins: [
    commonjs(),
    nodeResolve(),
    externals({
      include: ['solid-js', '@tarojs/runtime', '@tarojs/shared'],
    }),
    ts(),
    buble(),
  ],
}

const esmConfig = Object.assign({}, base, {
  output: {
    sourcemap: true,
    format: 'es',
    file: path.join(workspace, 'dist/index.esm.js'),
  },
  plugins: base.plugins.slice(0, base.plugins.length - 1),
})

// Solid custom render
const customRenderConfig = {
  output: {
    file: path.join(workspace, 'dist/index.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
  },
  ...base,
}

export default [customRenderConfig, esmConfig]

import * as path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { externals } from 'rollup-plugin-node-externals'
import ts from 'rollup-plugin-ts'

const base = {
  plugins: [
    commonjs(),
    nodeResolve(),
    externals({
      include: [
        '@tarojs/runtime',
        '@tarojs/shared',
        '@tarojs/service',
        '@tarojs/components'
      ],
    }),
    ts(),
  ],
}

// 供 CLI 编译时使用的 Taro 插件入口
const compileConfig = {
  input: path.join(__dirname, 'src/index.ts'),
  output: {
    file: path.join(__dirname, 'dist/index.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
  },
  ...base,
}

// 供 Loader 使用的运行时入口
const runtimeConfig = {
  input: path.join(__dirname, 'src/runtime/index.ts'),
  output: {
    file: path.join(__dirname, 'dist/runtime.js'),
    format: 'es',
    sourcemap: true,
  },
  ...base,
}

// Solid Loader
const loaderConfig = {
  input: path.join(__dirname, 'src/api-loader.ts'),
  output: {
    file: path.join(__dirname, 'dist/api-loader.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'auto',
  },
  ...base,
}

export default [compileConfig, runtimeConfig, loaderConfig]

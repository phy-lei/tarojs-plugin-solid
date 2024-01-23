import buble from '@rollup/plugin-buble'
import * as path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { externals } from 'rollup-plugin-node-externals'
import ts from 'rollup-plugin-ts'

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
    file: path.join(__dirname, 'dist/index.esm.js'),
  },
  plugins: base.plugins.slice(0, base.plugins.length - 1),
})

// Solid custom render
const customRenderConfig = {
  output: {
    file: path.join(__dirname, 'dist/index.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
  },
  ...base,
}

export default [customRenderConfig, esmConfig]

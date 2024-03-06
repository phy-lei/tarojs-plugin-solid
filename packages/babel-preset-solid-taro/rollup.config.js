import * as path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import { externals } from 'rollup-plugin-node-externals'

const plugins = [
  commonjs(),
  nodeResolve(),
  externals({
    include: ['@babel/types', '@tarojs/shared', '@tarojs/webpack5-runner'],
  }),
]

export default {
  input: 'src/index.js',

  output: {
    file: path.join(__dirname, 'dist/index.js'),
    format: 'cjs',
    exports: 'auto',
  },
  plugins,
}

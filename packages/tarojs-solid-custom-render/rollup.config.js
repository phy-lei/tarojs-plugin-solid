// import buble from '@rollup/plugin-buble'
import * as path from 'path'
import ts from 'rollup-plugin-ts'

const cwd = __dirname

const baseConfig = {
  input: path.join(cwd, 'index.ts'),
  output: [
    {
      file: path.join(cwd, 'dist/custom-render.js'),
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    }
  ],
  external: ['@tarojs/runtime', 'solid-js', '@tarojs/shared'],
  plugins: [
    ts(),
    // buble()
  ]
}

const esmConfig = Object.assign({}, baseConfig, {
  output: Object.assign({}, baseConfig.output[0], {
    sourcemap: true,
    format: 'es',
    file: path.join(cwd, 'dist/custom-render.esm.js')
  }),
  plugins: baseConfig.plugins.slice(0, baseConfig.plugins.length - 1)
})

function rollup () {
  const target = process.env.TARGET

  if (target === 'umd') {
    return baseConfig
  } else if (target === 'esm') {
    return esmConfig
  } else {
    return [baseConfig, esmConfig]
  }
}
module.exports = rollup()
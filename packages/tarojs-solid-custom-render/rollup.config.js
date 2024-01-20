import * as path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { externals } from 'rollup-plugin-node-externals';
import ts from 'rollup-plugin-ts';

const base = {
  plugins: [
    commonjs(),
    nodeResolve(),
    externals({
      include: [
        'solid-js',
        '@tarojs/runtime',
        '@tarojs/shared',
      ],
    }),
    ts(),
  ],
};


const esmConfig = {
  input: path.join(__dirname, 'index.ts'),
  output: {
    file: path.join(__dirname, 'dist/custom-render.esm.js'),
    format: 'es',
    sourcemap: true,
  },
  ...base,
};

// Solid custom render
const customRenderConfig = {
  input: path.join(__dirname, 'index.ts'),
  output: {
    file: path.join(__dirname, 'dist/custom-render.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
  },
  ...base,
};

export default [customRenderConfig, esmConfig];

import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      clean: true,
    }),
    css({ output: 'bundle.css' }),
  ],
  external: ['react', 'react-dom'],
}

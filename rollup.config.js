import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-import-css'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
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
    css(),
  ],
  external: ['react', 'react-dom'],
}

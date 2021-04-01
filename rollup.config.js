// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const externals = [
  "axios",
  "axios/lib/core/createError",
  "axios/lib/core/settle",
  "axios/lib/helpers/buildURL",
  "axios/lib/helpers/parseHeaders",
  "axios/lib/utils",
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        // dir: 'dist',
        file: "dist/axiosGmxhrAdapter.js",
        format: "umd",
        name: "axiosGmxhrAdapter",
        exports: "default",
        sourcemap: true,
      },
      {
        // dir: 'dist',
        file: "dist/axiosGmxhrAdapter.min.js",
        format: "umd",
        name: "axiosGmxhrAdapter",
        exports: "default",
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [typescript({ target: "es6" }), commonjs()],
  },
  {
    input: "src/index.ts",
    external: externals,
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        exports: "default",
        sourcemap: true,
      },
      {
        dir: "dist",
        format: "commonjs",
        exports: "default",
        sourcemap: true,
      },
    ],
    plugins: [typescript({ target: "es6" }), commonjs()],
  },
];

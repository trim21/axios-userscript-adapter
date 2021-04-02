// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";

const externals = [
  "axios",
  "axios/lib/core/createError",
  "axios/lib/core/settle",
  "axios/lib/helpers/buildURL",
  "axios/lib/helpers/parseHeaders",
  "axios/lib/utils",
];

const plugins = [
  commonjs(),
  typescript({ tsconfig: "./tsconfig.base.json" }),
  del({
    targets: "dist/dist",
    hook: "buildEnd",
    verbose: true,
  }),
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/axiosGmxhrAdapter.js",
        format: "umd",
        name: "axiosGmxhrAdapter",
        exports: "default",
        sourcemap: false,
      },
      {
        file: "dist/axiosGmxhrAdapter.min.js",
        format: "umd",
        name: "axiosGmxhrAdapter",
        exports: "default",
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins,
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
    plugins,
  },
];

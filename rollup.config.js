import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const globals = {
  axios: "axios",
};

const plugins = [commonjs(), typescript({ tsconfig: "./tsconfig.base.json" })];

export default {
  input: "src/index.ts",
  external: ["axios"],
  output: [
    {
      file: "dist/axiosGmxhrAdapter.js",
      format: "umd",
      name: "axiosGmxhrAdapter",
      exports: "default",
      globals,
      sourcemap: true,
    },
    {
      file: "dist/axiosGmxhrAdapter.min.js",
      format: "umd",
      name: "axiosGmxhrAdapter",
      exports: "default",
      sourcemap: true,
      globals,
      plugins: [terser()],
    },
  ],
  plugins,
};

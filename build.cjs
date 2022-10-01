const pkg = require("./package.json");

const esbuild = require("esbuild");

const entryPoints = ["./src/index.ts"];

const target = "es2020";

const option = { entryPoints, target };

esbuild.buildSync({ outfile: pkg.main, format: "cjs", ...option, sourcemap: "inline" });
esbuild.buildSync({ outfile: pkg.module, format: "esm", ...option, sourcemap: "inline" });

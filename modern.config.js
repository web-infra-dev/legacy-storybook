const { moduleTools } = require("@modern-js/module-tools");

const externalHelpers = true;
const skipDts = process.env.SKIP_DTS === "true";

const universalBuildConfig = [
  {
    buildType: "bundleless",
    format: "cjs",
    target: "es2019",
    dts: false,
    outDir: "./dist/cjs",
    externalHelpers,
  },
  {
    buildType: "bundleless",
    format: "esm",
    target: "es5",
    dts: false,
    outDir: "./dist/esm",
    externalHelpers,
  },
  {
    buildType: "bundleless",
    format: "esm",
    target: "es2019",
    dts: false,
    outDir: "./dist/esm-node",
    externalHelpers,
  },
  skipDts
    ? null
    : {
        buildType: "bundleless",
        dts: {
          only: true,
        },
        outDir: "./dist/types",
      },
].filter(Boolean);

module.exports = {
  plugins: [moduleTools()],
  buildConfig: [
    ...universalBuildConfig,
    {
      input: [],
      dts: false,
      copy: {
        patterns: [
          {
            from: "./template",
            context: __dirname,
            to: "./template",
          },
        ],
      },
    },
  ],
};

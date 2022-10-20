const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

const PATHS = {
  entryPoint: path.resolve(__dirname, "src/index.ts"),
  bundles: path.resolve(__dirname, "dist"),
};

if (!process.env.NODE_ENV) {
  console.warn("Environment mode is not set! Using default: development");
  process.env.NODE_ENV = "development";
}

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  target: "node",
  mode: process.env.NODE_ENV,
  externals: [nodeExternals()], // removes node_modules from your final bundle
  entry: {
    "node-xs": [PATHS.entryPoint],
    "node-xs.min": [PATHS.entryPoint],
  },
  output: {
    path: PATHS.bundles,
    filename: "[name].js",
    libraryTarget: "umd",
    library: "NodeXs",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: isProd,
    minimizer: [new TerserPlugin()],
  },
};

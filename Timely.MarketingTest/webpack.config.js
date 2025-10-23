const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: "./src/index.jsx", // main React file
    output: {
      path: path.resolve(__dirname, "wwwroot/assets"), // where the bundled files go
      filename: "main.js",
      clean: true // cleans old builds
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/, // for React/JSX files
          exclude: /node_modules/,
          use: { loader: "babel-loader" }
        },
        {
          test: /\.css$/, // for CSS/Tailwind
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader"
          ]
        }
      ]
    },
    resolve: { extensions: [".js", ".jsx"] },
    plugins: [
      new MiniCssExtractPlugin({ filename: "main.css" })
    ],
    watchOptions: { ignored: /node_modules/ }
  };
};

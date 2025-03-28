const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const isDevelopment = process.env.NODE_ENV !== "production";
const Dotenv = require("dotenv");
Dotenv.config();

module.exports = {
  entry: path.resolve(__dirname, "./src/index.tsx"), // Adjusted path
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./build"), // Adjusted path
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development",
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: "/" },
        { from: /^\/student/, to: "/" },
      ],
    },
    compress: true,
    host: "0.0.0.0",
    port: 4040,
    open: false,
    allowedHosts: "all",
    static: {
      directory: path.join(__dirname, "public"),
      publicPath: "/",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"), // Adjusted path
      publicPath: "/",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
      "process.env.NODE_ENV": JSON.stringify(
        isDevelopment ? "development" : "production"
      ),
    }),
  ],
  stats: {
    warningsFilter: [
      /Can't import the named export 'ReactComponent' \(imported as '\w+'\) from default-exporting module/,
      // Add more generic patterns if needed for other warnings.
    ],
  },
};

require("dotenv").config();

const dotEnv = require('dotenv-webpack');
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    path: path.join(__dirname, "/public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        //exclude: /nodeModules/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
    ],
  },
  plugins: [new dotEnv()]
};

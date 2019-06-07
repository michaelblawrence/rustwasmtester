const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    "./bootstrap.js"
  ],
  output: {
    path: path.resolve(__dirname, "../gh-pages"),
    filename: "bootstrap.js",
  },
  mode: "production",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
};

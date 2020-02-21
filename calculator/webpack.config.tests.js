const path = require('path');
//var jasmineWebpackPlugin = require('jasmine-webpack-plugin');

module.exports = {
  entry: "./src/tests/runTests.js",
  output: {
    path: path.resolve(__dirname, "."),
    filename: "./spec/tests.spec.js"
  },
  target: "web",
  optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
	stats: {
        colors: true
    },
    // devtool: 'source-map',
	mode: 'development',
	node: {
	  fs: 'empty'
	},
	module: {
	  rules: [
		]
	},
	plugins: [
	//new jasmineWebpackPlugin()
	]
};
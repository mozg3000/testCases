const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
	  main: ['./src/index.js']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
	publicPath: "/"
  },
  target: "web",
  optimization: {
		// We do not want to minimize our code.
		minimize: false
	},
	stats: {
        colors: true
    },
    devtool: 'source-map',
	mode: 'development',
	resolve: {
	  alias: {
		vue: 'vue/dist/vue.js'
	  },
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		// new HtmlWebpackPlugin({
			// template: 'index.html',
			// filename: 'index.html',
			
		// })
	]
};
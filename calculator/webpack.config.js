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
	module: {
		rules: [
			// {//Перекомпиляция в ES5
				// test: /\.js$/,
				// exclude: /node_modules/,
				// loader: "babel-loader"
			// },
			// {
				// test: /\.html$/,
				// use: {
					// loader: "html-loader"
				// }
			// },
			// {
				// test: /\.css$/,
				// use: ['style-loader', 'css-loader', 'sass-loader']
			// },
			// {
				// test: /\.(png|jpg|svg|gif)$/,
				// use: ['file-loader']
			// }
		]
	},
	plugins: [
		// new HtmlWebpackPlugin({
			// template: 'index.html',
			// filename: 'index.html',
			
		// })
	]
};
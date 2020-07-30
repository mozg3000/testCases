const path = require('path');
module.exports = {
	output: {
		filename: "sentence-generator.js"
	},
	resolve: {
	  alias: {
		vue: 'vue/dist/vue.js'
	  },
	},
	mode: 'production',
	target: "web",
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}
const path = require('path');
module.exports = {
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
	}
}
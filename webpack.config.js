const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./src/index.jsx',
	],
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test:   /\.css$/,
				loader: 'style-loader!css-loader!postcss-loader!cssnext-loader',
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'react-hot!babel',
        exclude: /node_modules/
			}, {
        test: /\.json$/,
        loader: 'json-loader',
      }
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['node_modules']
	},
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

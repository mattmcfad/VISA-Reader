module.exports = {
	entry: './src/index.jsx',
	output: {
		path: 'dist/build',
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: 'src'
			}, {
				test: /\.jsx$/,
				loader: 'babel-loader'
			}, {
        test: /\.json$/,
        loader: 'json-loader',
      },
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['node_modules']
	}
};

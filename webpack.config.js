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
        exclude: /node_modules/
			}, {
				test: /\.jsx$/,
				loader: 'babel-loader',
        exclude: /node_modules/
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

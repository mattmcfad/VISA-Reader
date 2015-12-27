module.exports = {
	entry: './client/src/index.jsx',
	output: {
		path: 'client/build',
		filename: 'index.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			include: 'src'
		}, {
			test: /\.jsx$/,
			loader: 'babel-loader'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modulesDirectories: ['node_modules']
	}
};

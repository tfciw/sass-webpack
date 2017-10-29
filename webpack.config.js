const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/app.js',

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname,'dist/')
	},

	plugins: [
		new cleanWebpackPlugin(['dist']),
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new htmlWebpackPlugin({
			filename: 'activity.html',
			template: 'src/activity.html'
		})
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				},
				exclude: [
					path.resolve(__dirname,'node_modules')
				]
			},
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader','sass-loader']
			},
			{
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name]_[hash:8].[ext]'
                    }
                }]
            },
			{
				test: /\.html$/,
				use: ['html-withimg-loader']
			},
			{
				test: /\.(woff|eot|ttf|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name]_[hash:8].[ext]'
					}
				}
			}
		]
	},

	devServer: {
		open: true,
		port: 3000
	}

}

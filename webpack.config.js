'use strict';

var webpack = require('webpack');
var path = require('path');

var plugins = [];
var production = process.env.NODE_ENV === "production";

if(production){
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			},
			output: {comments:false}
		})
	);
}


module.exports = {
	devtool: production ? 'source-map' : 'inline-source-map',
	entry: ['pixi.js', './src/index.js'],
	output: {
		filename: 'build/game.js'
	},
  resolve: {
    extensions: ["", ".js"]
  },
	module: {
    postLoaders: [
      {
				loader: "transform/cacheable?brfs"
			}
    ],
		loaders: [
			{
				test: /\.json$/,
				include: path.join(__dirname, 'node_modules', 'pixi.js'),
				loader: 'json'
			},
			{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader',
        query: {
          presets: ['es2015','stage-0']
        }
			}
		]
	}
};

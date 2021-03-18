const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
	return {
		entry: ["babel-polyfill", "./src/index.js"],
		mode: "production",
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					loader: "babel-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.(svg)$/,
					exclude: /fonts/,
					use: [
						{
							loader: "svg-url-loader",
							options: {
								noquotes: true,
								outputPath: "images/",
								name: "[name].[ext]",
							},
						},
					],
				},
				{
					test: /.(ttf|otf|eot|woff(2)|woff|svg?)(\?[a-z0-9]+)?$/,
					exclude: /images/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: "fonts/",
								name: "[name].[ext]",
								esModule: false,
							},
						},
					],
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(png|jpg|gif)$/i,
					use: [
						{
							loader: "file-loader",
							options: {
								limit: 2000,
								outputPath: "images/",
								name: "[name].[ext]",
							},
						},
					],
				},
			],
		},
		resolve: {
			extensions: ["*", ".js", ".jsx"],
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			// enable HMR globally
			new webpack.DefinePlugin({
				"process.env.PUBLIC_URL": JSON.stringify(__dirname),
				"process.env.REACT_APP_SHOPPER_API": JSON.stringify(
					process.env.REACT_APP_SHOPPER_API
				),
			}),

			new HtmlWebpackPlugin({
				template: "./public/index.html",
			}),
			new webpack.ProvidePlugin({
				process: "process",
			}),
		],
		output: {
			path: path.resolve(__dirname, "docs"),
			filename: "bundle.js",
			libraryTarget: "umd",
			umdNamedDefine: true,
			globalObject: "this",
		},
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin()],
		},
	};
};

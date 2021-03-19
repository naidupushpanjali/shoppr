const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: [
		"babel-polyfill",
		// activate HMR for React
		"react-hot-loader/patch",

		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint
		"webpack-dev-server/client?http://localhost:3000",

		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates
		"webpack/hot/only-dev-server",

		// the entry point of our app
		"./src/index.js",
	],
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
				test: /.(ttf|otf|eot|woff|woff(2)|svg?)(\?[a-z0-9]+)?$/,
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
		new webpack.DefinePlugin({
			"process.env.PUBLIC_URL": JSON.stringify(__dirname),
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
		new Dotenv(),
	],
	devServer: {
		contentBase: path.join(__dirname, "/dist/"),
		compress: false,
		host: "localhost",
		port: 3000,
		publicPath: "/",

		historyApiFallback: true,
		// respond to 404s with index.html

		hot: true,
		// enable HMR on the server
	},
	optimization: {
		minimize: false,
	},
};

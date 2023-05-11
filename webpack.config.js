const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/",
        clean: true,
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"],
        alias: {
            react: path.join(__dirname, "node_modules", "react"),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
        ],
    },
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
        }),
        new DefinePlugin({
            'process.env.VERSION': JSON.stringify(
                process.env.npm_package_version,
            ),
            'process.env.APP_NAME': JSON.stringify(
                process.env.npm_package_name,
            )
        }),
    ],
};
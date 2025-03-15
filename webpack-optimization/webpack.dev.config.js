const path = require("path");
const Htmlplugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
    mode: "development",
    entry: {
        index: {
            import: "./src/index.js",
            filename: "main-entry.js"
        },
        explore: "./src/explore.js",
    },
    output: {
        filename: "[name].bundle.js", // Generate hashed filenames
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "assets/[name][ext]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(jpeg|png|webp|avif|svg)$/,
                type: "asset/resource",
            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /.(ttf|woff|woff2|eot|otf)$/,
                type: "asset/resource",
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new Htmlplugin({
            template: "./src/index.html",
            chunks: ["index"],
            filename: "index.html",
        }),
        new Htmlplugin({
            template: "./src/explore-page.html",
            chunks: ["explore"],
            filename: "explore.html",
            inject: "body",
            minify: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/assets/images"), 
                    to: path.resolve(__dirname, "dist", "assets/images"),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
    ],
    devServer: {
        port: 3000,
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
};

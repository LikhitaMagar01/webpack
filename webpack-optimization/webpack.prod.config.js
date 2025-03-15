const path = require("path");
const Htmlplugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const glob = require("glob");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "src")
};

module.exports = {
    mode: "production",
    entry: {
        index: {
            import: "./src/index.js",
            filename: "main-entry.js"
        },
        explore: "./src/explore.js",
    },
    output: {
        filename: "[name].[contenthash].js", // Generate hashed filenames
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "asset/[hash][ext]",
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
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: "all"
        },
    },
    plugins: [
        new Htmlplugin({
            template: "./src/index.html",
            chunks: ["index"],
            filename: "index.[contenthash].html",
        }),
        new Htmlplugin({
            template: "./src/explore-page.html",
            chunks: ["explore"],
            filename: "explore.[contenthash].html",
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
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
            only: ["index"],
            safelist: ["unused-css"]
        }),
    ],
};

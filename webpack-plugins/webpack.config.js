const path = require("path");
const Htmlplugin = require("html-webpack-plugin");

module.exports = {
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
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /.(ttf|woff|woff2|eot|otf)$/,
                type: "asset/resource",
            }
        ]
    },
    plugins: [
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
        })
    ]
};

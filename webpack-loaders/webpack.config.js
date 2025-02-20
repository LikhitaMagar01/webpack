
const path = require("path");

module.exports = {
    entry: "./index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "assets/[hash][ext]",
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
    }
}
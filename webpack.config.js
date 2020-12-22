const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[contenthash].js',
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.jpg$/i,
                
                loader: 'file-loader',
                options: {
                    outputPath: 'imgs',
                    name: '[name].[ext]'
                    
                  },

            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
}
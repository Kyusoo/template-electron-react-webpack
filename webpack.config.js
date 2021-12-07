const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'dist')
const MODE = process.env.NODE_ENV || 'development'

module.exports = {
    entry: {
        main: `${SRC}/main.js`,
        view: `${SRC}/view.js`
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        path: DIST,
        libraryTarget: 'commonjs2'
    },
    externals: {
        'electron': 'commonjs2 electron'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env' ,'@babel/preset-react'],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.node.NodeTargetPlugin(),
        new webpack.electron.ElectronTargetPlugin(),
        new webpack.DefinePlugin({
            MODE: JSON.stringify(MODE)
        }),
        new CopyPlugin({ // "copy-webpack-plugin": "^9.1.0" ( Problem occurs in 10.0.0 )
            patterns: [
                {
                    from: `${SRC}/view.html`
                }
            ]
        }),
    ],
    node: {
        __dirname: false,
    },
    devtool: 'cheap-module-source-map',
    mode: MODE,
}
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {
        bundle: './index.jsx'
        //styles: './main.scss'
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
    },

    watchOptions: {
        aggregateTimeout: 100
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    devtool: '#cheap-module-source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ["babel-loader"]
        },
            {
                test: /\.scss$/,
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            },

        ],
        rules: [{
            test: /\.js?$/,
            use: ['babel-loader', ],
            exclude: /node_modules/
        },
            {
                test: /\.jsx?$/,
                use: ['babel-loader', ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ["css-loader?-minimize", 'sass-loader']
                })
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',    // where the fonts will go
                        publicPath: '../'       // override the default path
                    }
                }]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true
            /*закментить при билде*/
            ,disable: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: './public'
    }
};
const webpack = require('webpack');
const path = require('path');

modeul.exports = {
    entry: [
        './client/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 8080,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        hot: true,
        historyApiFallback: true,
        //proxy: {
        //     'route here': {
        //         target: 'http://localhost:3000/',
        //         secure: false,
        //     }
        // }

    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                },
            },
            {
                test: /.(css|scss)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './client/index.html',
        }),
    ],
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx'],
    },
}
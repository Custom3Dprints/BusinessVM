const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: {
        Events: './src/firebase-config.js'
        
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
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
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new Dotenv(),
    ],
};


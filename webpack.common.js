const path = require("path");

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'docs/assets/js'),
        globalObject: 'this',
        library: {
            name: 'SpinVisualizer',
            type: 'umd',
        },
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // The app entru point is src/index.js
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        // The output of the webpack build will be in /dist directory
        path: path.resolve(__dirname, 'build'),
        // The filename of the js bundle will be bundle.js
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                // For any file with a suffix of js or jsx
                test: /\.jsx?$/,
                // Ignore transpiling JavaScript from node_modules as it should be that state
                exclude: /node_modules/,
                use: {
                    // Use the babel-loader for transpiling JavaScript to a suitable format
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    }
                ]

            }
        ]
    },
    // Add a custom index.html as the template
    plugins: [new HtmlWebpackPlugin(
            {template: path.resolve(__dirname,'src','index.html')}
        )]
}
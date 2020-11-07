const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,    
            exclude: /node_modules/
        },
        {
            test: /\.s?css$/,   //saves evrery time file ending with scss is encountered
            use:[
                'style-loader',
                'css-loader',
                'sass-loader' //uses node sass behind the scenes
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};
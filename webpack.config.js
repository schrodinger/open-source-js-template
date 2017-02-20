var path = require('path');
var webpack = require('webpack');

module.exports = function getConfig(envIn) {
  const env = envIn | {};
  const config = {
    devtool: env.dev ? 'cheap-module-eval-source-map' : 'source-map',
    entry: [
      './src/index'
    ],
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /\.js|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      }]
    }
  }
  if (!env.dev) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }));
  }
  return config;
};

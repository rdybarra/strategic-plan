const webpack = require('webpack');

module.exports = {

  /*
   * Separate entry points for the main app, and the vendor files
   */
  entry: {
    vendor: './src/vendor.ts',
    app: './src/main.ts'
  },

  /*
   * Output our built files in the public/js directory.
   */
  output: {
    path: '../public/js',
    filename: '[name].js'
  },

  /*
   * Resolves these file types without explicit extensions.
   */
  resolve: {
    extensions: ['', '.ts', '.js']
  },

  /*
   *  Loaders
   */
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader'],
        include: [/src\/app/]
      },
      {
        test: /\.html$/, loader: 'raw-loader'
      }
    ],
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '../public/js/vendor.js'
      }),
    ]
  }
};

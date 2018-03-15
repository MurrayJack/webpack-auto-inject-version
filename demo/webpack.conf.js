const path = require('path');

// Require WebpackAutoInject from npm installed modules ( preferred )
// var WebpackAutoInject = require('webpack-auto-inject-version');
// Require WebpackAutoInject from dist - dev purpose only ( do not use the below line )
const WebpackAutoInject = require('../dist/WebpackAutoInjectVersion');

module.exports = {
  watch: true,
  entry: {
    index: ['./src/main.js'],
  },
  resolve: {
    extensions: ['.js', '.html'],
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader!html-minify-loader',
      },
    ],
  },
  plugins: [
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: false,
        InjectAsComment: false,
        InjectByTag: true,
      },
      componentsOptions: {
        AutoIncreaseVersion: {
          runInWatchMode: false, // it will increase version with every single build!
        },
        InjectAsComment: {
          tag: 'Version: {version}, {date}',
        },
        InjectByTag: {
          fileRegex: /\.+/,
          dateFormat: 'h:MM:ss',
        },
      },
    }),
  ],
};

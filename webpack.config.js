const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pumlRenderFormat = process.env.PUML_RENDER_FORMAT || 'svg'

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9000,
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      diagrams: path.resolve(__dirname, 'diagrams'),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      }, {
        loader: 'eslint-loader',
      }],
    }, {
      test: /.*\.puml$/,
      include: path.resolve(__dirname, 'diagrams'),
      use: [{
        loader: 'file-loader',
        options: {
          name: `diagrams/[name]-[hash].${pumlRenderFormat}`,
        },
      }, {
        loader: path.resolve(__dirname, 'plantuml-loader.js'),
        options: {
          renderFormat: pumlRenderFormat,
        },
      }],
    }],
  },
}

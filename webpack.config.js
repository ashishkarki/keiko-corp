const HtmlWebpackPlugin = require('html-webpack-plugin')
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally')
const uglifyJS = require('uglify-js')
const CleanCSS = require('clean-css')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/js/main.js',
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/i,
        type: 'asset',
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Webpack demo',
      header: '<h1>Webpack demo</h1>',
      metaDesc: 'This is a demo of webpack',
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new MergeIntoSingleFilePlugin({
      files: {
        'vendor.js': [
          // './src/js/main.js',
          './src/js/lib/jquery.js',
          './src/js/lib/bootstrap.min.js',
          './src/js/lib/ajaxchimp.js',
          './src/js/lib/nicescroll.js',
          './src/js/lib/owl.carousel.min.js',
          './src/js/lib/parallax.js',
          './src/js/lib/scrollTo.js',
          './src/js/lib/wow.js',
        ],
        'style.css': [
          './src/css/main.css',
          './src/css/animate.css',
          './src/css/bootstrap.css',
          './src/css/owl.carousel.css',
          './src/css/owl.theme.css',
          './src/css/owl.transitions.css',
          './src/css/reset.css',
        ],
      },
      transform: {
        'vendor.js': (code) => uglifyJS.minify(code).code,
        'style.css': (code) => new CleanCSS({}).minify(code).styles,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'dist/img'),
        },
        {
          from: path.resolve(__dirname, 'src/fonts'),
          to: path.resolve(__dirname, 'dist/fonts'),
        },
      ],
    }),
  ],
  output: {
    clean: true,
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    open: false,
    port: 3000,
  },
}

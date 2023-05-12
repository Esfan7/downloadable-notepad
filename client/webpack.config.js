const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { LoaderOptionsPlugin } = require('webpack');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Jate"
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js"
      }),
      new WebpackPwaManifest({
        name: 'Just another text editor',
        short_name: 'JATE',
        description: 'pwa that installs jate',
        background_color: '#000',
        inject: true,
        fingerprints: true,
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          },
       
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader" ,"css-loader"]
        },
        {
          test: /\.m?js$/,
          exclude:/node_modules/,
          use: {
            loader:"babel-loader",
            options:{
              presets:["@babel/preset-env"],
              plugins:["@babel/plugin-transform-runtime" ]
            }
          }
        },
      ],
    },
  };
};

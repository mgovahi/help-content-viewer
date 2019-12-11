var env = process.env.NODE_ENV.trim();
var devMode = env != "production";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const here = p => path.join(__dirname, p);
const CSSModuleLoader = {
  loader: "css-loader",
  options: {
    modules: {
        mode: 'local',
        localIdentName: "[local]"
    },
    sourceMap: true,
    
  }
};

/*************** Module **************/
module.exports = {
  mode: env,
  /************** Entry ****************/
  entry: "./index.js",

  /*************** Output **************/
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "help-content-viewer.js",
    library :"helpContentViewer"

    
  },

  /*************** rules **************/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"] 
          }
        }
      },
      {
        test: /\.css$/,
        //exclude: /node_modules/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          CSSModuleLoader,
          {
            loader: `postcss-loader`,
            options: {
              options: {},
            }
          }
      
        ]
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          CSSModuleLoader,
          {
            loader: `postcss-loader`,
            options: {
              options: {},
            }
          },
          "sass-loader"
        ]
      },
      { 
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  ],
  optimization: {
		// We no not want to minimize our code.
		minimize: true
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: false,
        port: 9000
        },
    externals: {
        jquery: 'jQuery'
    }
};

/**
 * Created by shu on 7/5/2017.
 */

const path = require('path')

// extend webpack configs
module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.(css|less)$/,
      use: [{
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }]
    },
    {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader']
    },
    {
      test: /\.less$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader', 'less-loader']
    })
    return config
  }
}

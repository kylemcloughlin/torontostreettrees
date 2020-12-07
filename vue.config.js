const Dotenv = require("dotenv-webpack")
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://cryptic-savannah-08889.herokuapp.com/',
        ws: true,
        changeOrigin: true,
      },
    },
  },
   configureWebpack: {
       plugins: [
           new Dotenv({
             systemvars: true
           })
       ]
          }
};
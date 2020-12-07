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
}
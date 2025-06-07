const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',  // necesario para webpack-dev-server
    clean: true,      // limpia la carpeta dist en cada build
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],  // aquí cargas los estilos CSS
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  // carpeta con index.html
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
};

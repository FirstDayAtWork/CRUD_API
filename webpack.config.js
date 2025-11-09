import path from 'node:path';

export default {
  entry: path.resolve(import.meta.dirname, './src/index.ts'),
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(import.meta.dirname, 'dist'),
  },
};
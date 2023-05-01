# Use live-server to run a web server
npm install -D live-server
live-server public

# Install babel 7
npm install -D @babel/cli @babel/core @babel/preset-env @babel/preset-react
babel src/app.jsx --out-file=public/scripts/app.js --watch

# Install webpack
npm install -D webpack webpack-cli
npm install -D babel-loader
npm install -D webpack-dev-server

# Install React
npm install react react-dom

# Install style loaders
npm install style-loader css-loader
npm install sass-loader node-sass

# Install normalize.css
npm install normalize.css

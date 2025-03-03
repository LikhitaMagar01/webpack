# webpack
- static modul bundler for mordern js application
- internally builds dependency graphs from one or more entry points
- combines every module the project needs into one or more bundles

# how web pack works

entry --> one or more entry points
  |
  |
loader --> different file types transformation, css loader/ts loader
  |
  |
plugins --> global transformations
  |
  |
output --> optimized bundle output

# what webpack can do
- load different assets files
- dependency graph
- optimized production build
- bundle spitting
- hot module replacement
- dead code elimination (tree shaking)
- module federation
- caching
- duplicate code elimination


# webpack plugins:
1. ProgressPlugin:
  to track your build in when we build: npm run build

2. HtmlWebpackPlugin / mini-css-extract plugin / copyWebpackPlugin:
  to keep all our code in a bundle file

3. EnvironmentPlugin:
  to add various variables according to the environments like staging, production, local

4. TerserWebpackPlugin:
  js file should be minified and optimize bundle, it is used for this.

5. CssMinimizerWebpackPlugin:
  css minification

6. webpack-bundle-analyzer:
  bundle analysis, minification and optimization of bundle


# Webpack Learning Project

A comprehensive webpack learning repository with examples covering webpack basics, loaders, plugins, optimization, and micro-frontend architecture.

## What is Webpack?

Webpack is a **static module bundler** for modern JavaScript applications. It:
- Internally builds dependency graphs from one or more entry points
- Combines every module the project needs into one or more bundles
- Transforms and optimizes assets for production deployment

## How Webpack Works

```
Entry → Loaders → Plugins → Output
  ↓        ↓         ↓        ↓
Entry    File     Global   Optimized
Points  Trans-   Trans-   Bundle
        forms    forms    Output
```

### The Pipeline:
1. **Entry**: One or more entry points where webpack starts building the dependency graph
2. **Loaders**: Transform different file types (CSS, TypeScript, images, etc.)
3. **Plugins**: Apply global transformations and optimizations
4. **Output**: Generate optimized bundle files

## What Webpack Can Do

- **Asset Loading**: Handle various file types (JS, CSS, images, fonts, etc.)
- **Dependency Management**: Build and resolve dependency graphs
- **Production Optimization**: Create optimized production builds
- **Code Splitting**: Split bundles for better performance
- **Hot Module Replacement**: Enable fast development with live reloading
- **Tree Shaking**: Eliminate dead code (unused exports)
- **Module Federation**: Share modules between applications
- **Caching**: Implement efficient caching strategies
- **Duplicate Elimination**: Remove duplicate code across modules

## Project Structure

This repository contains several webpack examples:

### 1. Webpack Basics (`webpack-basics/`)
- Simple webpack configuration
- Basic bundling concepts
- Entry and output configuration

### 2. Webpack Loaders (`webpack-loaders/`)
- CSS, SCSS, and style loaders
- File and image loaders
- Font loading examples

### 3. Webpack Plugins (`webpack-plugins/`)
- HTML Webpack Plugin
- Mini CSS Extract Plugin
- Copy Webpack Plugin
- Environment Plugin

### 4. Webpack Optimization (`webpack-optimization/`)
- Production vs Development configurations
- Bundle optimization techniques
- Performance improvements

### 5. Micro-Frontend Architecture (`micro-frontend/`)
- **Backend**: Node.js/Express API with TypeScript
- **Todo React App**: React frontend for todo management
- **Profile Vue App**: Vue.js frontend for user profiles
- Shared backend services and APIs

## Essential Webpack Plugins

### 1. ProgressPlugin
Tracks build progress when running `npm run build`

### 2. HtmlWebpackPlugin
Generates HTML files and injects bundles automatically

### 3. MiniCssExtractPlugin
Extracts CSS into separate files for better caching

### 4. CopyWebpackPlugin
Copies static assets to the output directory

### 5. EnvironmentPlugin
Adds environment variables for different stages (staging, production, local)

### 6. TerserWebpackPlugin
Minifies and optimizes JavaScript bundles

### 7. CssMinimizerWebpackPlugin
Minifies CSS files for production

### 8. WebpackBundleAnalyzer
Analyzes bundle size and composition for optimization

## Source Maps

Source maps are powerful tools for debugging that map minified code back to original source code.

### Benefits:
- **Debugging**: Debug optimized webpack bundles efficiently
- **Error Reporting**: Get meaningful error stack traces
- **Development**: Easier development experience
- **Code Readability**: Read original source code in browser dev tools

### Considerations:
- **Bundle Size**: Increases bundle size
- **Security**: May expose source code structure
- **Performance**: Slight performance overhead

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd webpack

# Install dependencies for each example
cd webpack-basics && npm install
cd ../webpack-loaders && npm install
cd ../webpack-plugins && npm install
cd ../webpack-optimization && npm install
cd ../micro-frontend && npm install
```

### Running Examples
```bash
# Development mode
npm run dev

# Production build
npm run build

# Start development server
npm start
```

## Micro-Frontend Setup

The micro-frontend example demonstrates a complete architecture:

### Backend API
```bash
cd micro-frontend/backend
npm install
npm run dev
```

### React Todo App
```bash
cd micro-frontend/todo-react-app
npm install
npm run dev
```

### Vue Profile App
```bash
cd micro-frontend/profile-vue-app
npm install
npm run dev
```

## Contributing

Feel free to contribute by:
- Adding new webpack examples
- Improving existing configurations
- Adding documentation
- Reporting issues

## License

This project is open source and available under the Likhita roof.


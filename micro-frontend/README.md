# Micro-Frontend Project

A modern micro-frontend application built with Vue.js, React, and Fastify backend, demonstrating module federation and micro-frontend architecture.

## 🏗️ Project Architecture

This project consists of three main components:

- **Backend API** (Fastify + TypeScript + MongoDB)
- **Profile App** (Vue.js 3 + TypeScript + Tailwind CSS)
- **Todo App** (React 18 + TypeScript + Tailwind CSS)

The applications communicate through Webpack Module Federation, allowing the Vue.js profile app to load and display the React todo app as a micro-frontend.

## 📁 Project Structure

```
micro-frontend/
├── backend/                 # Fastify API server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── types/          # TypeScript type definitions
│   └── package.json
├── profile-vue-app/        # Vue.js Profile Application
│   ├── src/
│   │   ├── components/     # Vue components
│   │   └── types/          # TypeScript definitions
│   └── package.json
├── todo-react-app/         # React Todo Application
│   ├── src/
│   │   ├── components/     # React components
│   │   └── services/       # API services
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### 1. Clone and Setup

```bash
git clone <repository-url>
cd micro-frontend
```

### 2. Environment Setup

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env  # if available, or create manually
```

Add your MongoDB connection string:

```env
MONGO_URI=mongodb://localhost:27017/micro-frontend-db
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/micro-frontend-db
```

### 3. Install Dependencies

Install dependencies for all three applications:

```bash
# Backend dependencies
cd backend
npm install

# Profile Vue App dependencies
cd ../profile-vue-app
npm install

# Todo React App dependencies
cd ../todo-react-app
npm install
```

### 4. Start the Applications

You'll need to run all three applications simultaneously. Open three terminal windows:

#### Terminal 1 - Backend API
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

#### Terminal 2 - Profile Vue App
```bash
cd profile-vue-app
npm run start
```
The Vue app will start on `http://localhost:3000`

#### Terminal 3 - Todo React App (Optional - for standalone testing)
```bash
cd todo-react-app
npm run start
```
The React app will start on `http://localhost:3001`

## 🎯 Application Details

### Backend API (Fastify + TypeScript)

**Port:** 5000  
**Framework:** Fastify  
**Database:** MongoDB with Mongoose  
**Features:**
- RESTful API endpoints for profiles and todos
- CORS enabled for cross-origin requests
- TypeScript for type safety
- MongoDB integration with Mongoose ODM

**API Endpoints:**
- `GET /api/profiles/profile/:id` - Get profile by ID
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Profile Vue App

**Port:** 3000  
**Framework:** Vue.js 3 with Composition API  
**Styling:** Tailwind CSS  
**Build Tool:** Webpack with Module Federation  
**Features:**
- Modern Vue.js 3 with TypeScript
- Responsive design with Tailwind CSS
- Profile display with avatar and user information
- Side drawer for detailed profile view
- Integration with React Todo app via Module Federation
- Axios for API communication

**Key Components:**
- Profile card with user information
- Clickable avatar that opens a detailed drawer
- Integrated Todo app section
- Responsive layout with gradient backgrounds

### Todo React App

**Port:** 3001 (when run standalone)  
**Framework:** React 18 with TypeScript  
**Styling:** Tailwind CSS  
**Build Tool:** Webpack with Module Federation  
**Features:**
- React 18 with modern hooks
- TypeScript for type safety
- Tailwind CSS for styling
- CRUD operations for todos
- Advanced date-based filtering and search
- Week view navigation with clickable dates
- Custom date picker for searching any date
- Responsive design

**Key Components:**
- TodoList - Main container for todos
- Todo - Individual todo item component
- MainPage - Page layout and structure with date navigation
- TodoService - API communication layer

**Date Search Features:**
- **Week View**: Click on any date in the current week to view todos
- **Date Picker**: Search for todos on any specific date using the date input
- **Search Mode**: Toggle between week view and custom date search
- **Navigation**: Previous/Next day buttons for easy date navigation
- **Visual Indicators**: Clear indication of current date and search results

## 🔧 Module Federation

The project uses Webpack Module Federation to enable micro-frontend architecture:

- **Profile Vue App** acts as the host application
- **Todo React App** is exposed as a remote module
- Shared dependencies (React, React-DOM) are properly configured
- CSS and styling are isolated between applications

### Federation Configuration

**Profile Vue App (Host):**
```javascript
// webpack.config.js
new ModuleFederationPlugin({
  name: 'profileApp',
  remotes: {
    todoApp: 'todoApp@http://localhost:3001/remoteEntry.js',
  },
  // ... other config
})
```

**Todo React App (Remote):**
```javascript
// webpack.config.js
new ModuleFederationPlugin({
  name: 'todoApp',
  filename: 'remoteEntry.js',
  exposes: {
    './TodoApp': './src/bootstrap',
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] }
  },
})
```

## 🎨 Styling

Both frontend applications use **Tailwind CSS** for styling:

- **Tailwind CSS v3** for utility-first styling
- **PostCSS** for processing
- **Autoprefixer** for browser compatibility
- Responsive design with mobile-first approach

## 📱 Features

### Profile App Features
- ✅ User profile display with avatar
- ✅ Interactive profile drawer
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Integration with Todo app

### Todo App Features
- ✅ Create, read, update, delete todos
- ✅ Date-based filtering and search
- ✅ Week view navigation
- ✅ Date picker for custom date search
- ✅ Responsive design
- ✅ Real-time API communication
- ✅ TypeScript type safety

### Backend Features
- ✅ RESTful API endpoints
- ✅ MongoDB integration
- ✅ CORS support
- ✅ TypeScript support
- ✅ Error handling

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev      # Start development server with nodemon
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
```

**Profile Vue App:**
```bash
npm start        # Start development server
npm run build    # Build for production
npm run serve    # Serve production build
```

**Todo React App:**
```bash
npm start        # Start development server
npm run build    # Build for production
npm run serve    # Serve production build
```

### Development Workflow

1. Start the backend API first
2. Start the Todo React app (for Module Federation)
3. Start the Profile Vue app
4. Access the main application at `http://localhost:3000`

## 🔍 Troubleshooting

### Common Issues

1. **Module Federation Connection Error**
   - Ensure both frontend apps are running
   - Check that ports 3000 and 3001 are available
   - Verify webpack configurations

2. **MongoDB Connection Error**
   - Check MongoDB is running
   - Verify connection string in `.env` file
   - Ensure network connectivity

3. **CSS Not Loading**
   - Check PostCSS configuration
   - Verify Tailwind CSS is properly configured
   - Clear browser cache

4. **TypeScript Errors**
   - Run `npm install` in all directories
   - Check TypeScript configurations
   - Verify type definitions are installed

### Port Conflicts

If you encounter port conflicts, you can modify the ports in:
- Backend: `backend/src/index.ts` (line 25)
- Profile App: `profile-vue-app/webpack.config.js` (line 8)
- Todo App: `todo-react-app/webpack.config.js` (line 8)

## 📚 Technologies Used

### Backend
- **Fastify** - Fast web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Webpack** - Module bundler
- **Module Federation** - Micro-frontend architecture
- **Axios** - HTTP client

### Development Tools
- **Nodemon** - Development server for backend
- **Webpack Dev Server** - Development server for frontend
- **PostCSS** - CSS processing
- **Babel** - JavaScript compiler

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the Likhita License hehe.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all dependencies are properly installed
4. Verify all services are running on correct ports
5. Please feel free to contact me on feb 30.

---

**Happy coding! 🚀** 
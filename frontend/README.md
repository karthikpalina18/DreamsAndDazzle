# EcomStore Frontend

A modern React-based frontend for the EcomStore ecommerce application.

## Features

- 🏠 **Home Page**: Beautiful landing page with hero section, features, and categories
- 🔐 **Authentication**: Login and Signup pages with form validation
- 📱 **Responsive Design**: Mobile-first approach with beautiful UI
- 🎨 **Modern UI/UX**: Gradient backgrounds, smooth animations, and interactive elements
- 🚀 **Performance**: Optimized React components with proper state management

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Context API** - State management for authentication
- **CSS3** - Modern styling with flexbox and grid
- **Responsive Design** - Mobile-first approach

## Project Structure

```
src/
├── components/
│   └── layout/
│       ├── Header.js       # Navigation header
│       ├── Header.css      # Header styles
│       ├── Footer.js       # Footer component
│       └── Footer.css      # Footer styles
├── context/
│   └── AuthContext.js      # Authentication context
├── pages/
│   ├── Home.js            # Home page component
│   ├── Home.css           # Home page styles
│   ├── Login.js           # Login page component
│   ├── Signup.js          # Signup page component
│   └── Auth.css           # Authentication pages styles
├── App.js                 # Main app component
├── App.css                # Global styles
└── index.js               # App entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Environment Setup

The app is configured to proxy API requests to `http://localhost:5000` (your backend server). Make sure your backend is running before starting the frontend.

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## API Integration

The frontend connects to your backend API through:

- **Authentication**: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
- **Proxy Configuration**: All API requests are proxied to `http://localhost:5000`

## Features Implemented

### 1. Home Page
- Hero section with call-to-action buttons
- Features showcase (shipping, security, quality, support)
- Category preview cards
- Dynamic content based on authentication status

### 2. Authentication System
- **Login Page**: Email/password authentication
- **Signup Page**: User registration with validation
- **Form Validation**: Client-side validation with error messages
- **Authentication Context**: Global state management
- **Protected Routes**: Automatic redirection for authenticated users

### 3. UI/UX Features
- **Responsive Design**: Works on all device sizes
- **Modern Styling**: Gradients, shadows, animations
- **Loading States**: Spinners and disabled states during API calls
- **Error Handling**: User-friendly error messages
- **Smooth Animations**: Hover effects and transitions

## Styling Approach

- **CSS Variables**: Consistent color scheme
- **Flexbox/Grid**: Modern layout techniques
- **Mobile-First**: Responsive design starting from mobile
- **Component-Scoped**: Each component has its own CSS file
- **Global Utilities**: Reusable utility classes in App.css

## Authentication
# Natural Products Frontend

A modern, professional React application for a natural products e-commerce platform built with Vite, Tailwind CSS, and a focus on sustainable living.

## 🌿 Features

### ✅ Authentication System

- **User Registration** with avatar upload (Cloudinary integration ready)
- **User Login** with form validation
- **Automatic Token Refresh** for seamless user experience
- **Protected Routes** for authenticated content
- **Secure Logout** functionality

### 🎨 Modern UI/UX

- **Responsive Design** that works on all devices
- **Natural Color Theme** (Green, Yellow, White) representing eco-friendliness
- **Professional Typography** with Inter and Poppins fonts
- **Smooth Animations** and hover effects
- **Accessible Components** with proper contrast and focus states

### 📱 Pages & Components

- **Home Page** - Hero section, features, testimonials, and CTAs
- **About Page** - Company story, values, team, and certifications
- **Products Page** - Product grid with search, filtering, and sorting
- **Contact Page** - Contact form with validation and company info
- **Authentication Pages** - Login and registration with form validation

### 🛠 Technical Stack

- **React 18** with modern hooks and context
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **React Router Dom** for client-side routing
- **React Hook Form** for form management
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Lucide React** for beautiful icons

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:8000`

### Installation

1. **Clone and setup the project:**

   ```bash
   cd frontent
   npm install
   ```

2. **Environment Configuration:**

   ```bash
   cp .env-info .env
   ```

   Then edit `.env` with your actual values:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
   VITE_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   App will be available at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

## 🏗 Project Structure

```
frontent/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   └── LoadingSpinner.jsx
│   │   └── layout/           # Layout components
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── context/              # React contexts
│   │   └── AuthContext.jsx   # Authentication context
│   ├── pages/                # Page components
│   │   ├── auth/             # Authentication pages
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── ContactPage.jsx
│   ├── services/             # API services
│   │   ├── apiClient.js      # Axios configuration
│   │   └── authService.js    # Authentication API calls
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                   # Static assets
├── .env-info                # Environment variables template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🎨 Design System

### Color Palette

```css
/* Primary Green - Main brand color */
primary: #22c55e (green-500)

/* Secondary Yellow - Accent color */
secondary: #eab308 (yellow-500)

/* Natural Grays - Text and backgrounds */
natural: #71717a (zinc-500)
```

### Typography

- **Headings**: Poppins (bold, display font)
- **Body**: Inter (clean, readable font)

### Components

- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Forms**: `.input-field` with consistent styling
- **Cards**: `.card` with shadow and rounded corners
- **Container**: `.container-custom` for consistent max-width

## 🔒 Authentication Flow

1. **Registration**: User creates account with avatar upload
2. **Login**: User authenticates and receives access/refresh tokens
3. **Token Storage**: Tokens stored in HTTP-only cookies
4. **Auto Refresh**: Access tokens automatically refreshed when expired
5. **Protected Routes**: Products page requires authentication
6. **Logout**: Tokens invalidated and user redirected

## 📡 API Integration

The frontend connects to your backend API with these endpoints:

- `POST /users/register` - User registration
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `POST /users/refresh-token` - Token refresh

API client includes:

- **Automatic token refresh** on 401 responses
- **Request/response interceptors** for logging
- **Proper error handling** with user feedback

## 🎯 User Experience

### Navigation Flow

- **Unauthenticated**: Home → About → Contact → Login/Register
- **Authenticated**: All pages + Products page access
- **Responsive**: Mobile-first design with hamburger menu

### Form Validation

- **Client-side validation** with React Hook Form
- **Real-time feedback** for form errors
- **Accessible error messages** with proper ARIA labels

### Loading States

- **Loading spinners** for async operations
- **Disabled states** for buttons during submission
- **Toast notifications** for success/error feedback

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

- **ESLint** configuration for code quality
- **Consistent naming** conventions
- **Component organization** by feature/type
- **Responsive design** patterns

## 🌍 Environment Variables

| Variable                        | Description              | Required |
| ------------------------------- | ------------------------ | -------- |
| `VITE_API_BASE_URL`             | Backend API URL          | Yes      |
| `VITE_CLOUDINARY_CLOUD_NAME`    | Cloudinary cloud name    | Yes      |
| `VITE_CLOUDINARY_API_KEY`       | Cloudinary API key       | Yes      |
| `VITE_CLOUDINARY_API_SECRET`    | Cloudinary API secret    | Yes      |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | Yes      |

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set environment variables in dashboard
3. Deploy with automatic builds on push

### Performance Optimizations

- **Code splitting** with dynamic imports
- **Image optimization** with proper formats
- **Tree shaking** for minimal bundle size
- **CSS purging** with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Add tests for new features
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

**Built with 💚 for sustainable living and natural products.**

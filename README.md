# InstaDev - Social Media Platform

A modern, feature-rich social media application built with React and TypeScript. This project allows users to create accounts, share posts with images, like and save posts, follow other users, and explore content from the community.

## ✨ Features

- 🔐 **User Authentication** - Sign up, sign in, and secure user sessions
- 📸 **Post Creation** - Create posts with images and captions
- ❤️ **Social Interactions** - Like, save, and comment on posts
- 👥 **User Profiles** - View and manage user profiles
- 🔍 **Explore** - Discover new content and users
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful, intuitive interface with smooth animations

## 🚀 Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant forms with validation
- **Zod** - Schema validation

### Backend & Database

- **Appwrite** - Backend-as-a-Service for authentication, database, and storage
- **Appwrite Database** - NoSQL database for posts, users, and interactions
- **Appwrite Storage** - File storage for images and media

### State Management

- **TanStack Query (React Query)** - Server state management and caching
- **Zustand** - Lightweight state management
- **React Context** - Local state management

### UI Components

- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful icon library
- **React Dropzone** - File upload functionality
- **Class Variance Authority** - Component styling utilities

### Testing & Quality

- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **Playwright** - End-to-end testing
- **MSW (Mock Service Worker)** - API mocking for tests
- **ESLint** - Code linting and formatting

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/instadev.git
   cd instadev
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Appwrite configuration:

   ```env
   VITE_APPWRITE_API_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DB_ID=your_database_id
   VITE_APPWRITE_STORAGE_ID=your_storage_id
   VITE_APPWRITE_USERS_COLLECTION=your_users_collection_id
   VITE_APPWRITE_POSTS_COLLECTION=your_posts_collection_id
   VITE_APPWRITE_SAVES_COLLECTION=your_saves_collection_id
   VITE_APPWRITE_LIKES_COLLECTION=your_likes_collection_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🧪 Testing

- **Run unit tests**: `npm run test`
- **Run end-to-end tests**: `npm run e2e`
- **Lint code**: `npm run lint`

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📁 Project Structure

```
src/
├── auth/              # Authentication components
├── components/        # Reusable UI components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries and configurations
├── root/              # Main app pages and layout
├── services/          # API service functions
├── store/             # State management
└── utils/             # Helper functions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Backend services by [Appwrite](https://appwrite.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

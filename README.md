# 🌐 Portfolio Website - Frontend

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a dynamic blog system, project showcase, and an admin dashboard for content management.

## 🚀 Live Demo

- **Frontend URL**: [https://portfolio-frontend-five-blond.vercel.app]
- **Backend API**: [https://portfolio-backend-nu-two.vercel.app]

## ✨ Features

### Public Features
- **Home Page**: Engaging landing page with hero section and quick navigation
- **About Me Section**: Personal information, work experience, and skills showcase
- **Blog Page**: 
  - View all published blog posts with ISR (Incremental Static Regeneration)
  - Individual blog pages with dynamic routing and ISR
  - Responsive card layout with pagination
- **Projects Showcase**: Display personal projects with thumbnails, descriptions, and live links
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)

### Private Features (Admin Only)
- **Secure Authentication**: JWT-based login system
- **Admin Dashboard**: 
  - Centralized content management interface
  - Blog CRUD operations (Create, Read, Update, Delete)
  - Real-time statistics and analytics
- **Rich Text Editor**: Format blog content with bold, italic, links, images, and more
- **Toast Notifications**: Real-time feedback for all actions using react-hot-toast

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router / Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API / Zustand
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Rich Text Editor**: React Quill
- **Notifications**: react-hot-toast
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- Backend API running (see backend repository)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sahajewel/portfolio-next.js-frontend.git
cd portfolio-next.js-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm  start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
portfolio-frontend/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app directory (if using App Router)
│   ├── pages/          # Next.js pages (if using Pages Router)
│   │   ├── index.tsx           # Home page
│   │   ├── about.tsx           # About me page
│   │   ├── blogs/              # Blog pages
│   │   │   ├── index.tsx       # All blogs (ISR)
│   │   │   └── [id].tsx        # Individual blog (ISR)
│   │   ├── projects.tsx        # Projects showcase
│   │   ├── login.tsx           # Admin login
│   │   └── dashboard/          # Admin dashboard
│   ├── components/     # Reusable components
│   │   ├── login/
│   │   ├── public/
│   │   ├── templates
│   ├── lib/            # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── middleware/        # React Context
│   ├── types/          # TypeScript types        
├── .env.local          # Environment variables
├── next.config.ts      # Next.js configuration
├── postcss.config.mjs  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🔐 Admin Credentials

For testing the admin dashboard, use these credentials:

- **Email**: `admin@portfolio.com`
- or
- **username**: `admin_portfolio`
- **Password**: `Admin@123456`


### Authentication Flow

1. User logs in via `/login` page
2. JWT token stored in httpOnly cookie
3. Protected routes check for valid token
4. Automatic redirect to login if unauthorized

### Error Handling

- API error handling with try-catch blocks
- User-friendly error messages via toast notifications
- 404 and error pages for better UX

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Deploy on vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- Portfolio: [https://sahajewel.com]
- GitHub: [Saha Jewel Kumar](https://github.com/Sahajewel)
- LinkedIn: [Saha Jewel Kumar](https://www.linkedin.com/in/sahajewelkumar)
- Email: jewelsaha072@gmail.com

## 🙏 Acknowledgments

- Next.js Documentation
- Tailwind CSS
- Vercel for hosting

---

**Note**: Make sure the backend server is running before starting the frontend application. Refer to the backend README for setup instructions.
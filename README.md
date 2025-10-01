# 🌐 Portfolio Website - Frontend

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a dynamic blog system, project showcase, and an admin dashboard for content management.

## 🚀 Live Demo

- **Frontend URL**: [Your Vercel/Netlify URL]
- **Backend API**: [Your Backend URL]

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
git clone https://github.com/yourusername/portfolio-frontend.git
cd portfolio-frontend
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
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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
npm run start
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
│   │   ├── Layout/
│   │   ├── Blog/
│   │   ├── Dashboard/
│   │   └── UI/
│   ├── lib/            # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── context/        # React Context
│   ├── types/          # TypeScript types
│   └── styles/         # Global styles
├── .env.local          # Environment variables
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🔐 Admin Credentials

For testing the admin dashboard, use these credentials:

- **Email**: `admin@portfolio.com`
- **Password**: `Admin@123456`

## 🎨 Key Features Implementation

### ISR (Incremental Static Regeneration)

**All Blogs Page:**
```typescript
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/blogs`);
  const blogs = await res.json();
  
  return {
    props: { blogs },
    revalidate: 60 // Revalidate every 60 seconds
  };
}
```

**Individual Blog Page:**
```typescript
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/blogs`);
  const blogs = await res.json();
  
  const paths = blogs.map((blog) => ({
    params: { id: blog.id.toString() }
  }));
  
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}/blogs/${params.id}`);
  const blog = await res.json();
  
  return {
    props: { blog },
    revalidate: 60
  };
}
```

### Authentication Flow

1. User logs in via `/login` page
2. JWT token stored in localStorage/httpOnly cookie
3. Protected routes check for valid token
4. Automatic redirect to login if unauthorized

### Error Handling

- Form validation with React Hook Form
- API error handling with try-catch blocks
- User-friendly error messages via toast notifications
- 404 and error pages for better UX

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
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
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🧪 Testing Checklist

- [ ] All public pages load correctly
- [ ] Blog list displays with ISR
- [ ] Individual blog pages generate dynamically
- [ ] Projects showcase loads properly
- [ ] Admin login works with correct credentials
- [ ] Dashboard is protected (redirects if not logged in)
- [ ] CRUD operations for blogs work correctly
- [ ] Toast notifications appear for all actions
- [ ] Form validation works properly
- [ ] Responsive design on all devices
- [ ] No console errors or warnings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- Portfolio: [your-portfolio-url]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Next.js Documentation
- Tailwind CSS
- React Quill
- Vercel for hosting

---

**Note**: Make sure the backend server is running before starting the frontend application. Refer to the backend README for setup instructions.
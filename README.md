# Tony Mendes — 3D Motion Design Portfolio

A premium, high-performance portfolio platform for 3D motion designers. Built with Next.js 16, React 19, and Prisma 7.

## 🌟 Features

- **Public Portfolio**: A stunning, responsive gallery showcasing 3D & motion design projects.
- **Admin Dashboard**: Private management area to add, edit, or delete projects via YouTube links.
- **YouTube Integration**: Automatic thumbnail extraction and responsive video embeds.
- **Dynamic Filtering**: Tag-based filtering for effortless project discovery.
- **Modern Tech Stack**: Leveraging the latest features of Next.js 16 (App Router, Proxy/Middleware) and React 19 (Server Components, Actions).

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS, Framer Motion
- **Database**: SQLite (via Prisma 7)
- **Auth**: NextAuth (v5 Beta)
- **Components**: shadcn/ui

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.17 or later
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory (you can copy `.env.example` if it exists, or use the following):
```env
NEXTAUTH_SECRET="your-secret-here"
ADMIN_EMAIL="tony@tonymendes.com"
ADMIN_PASSWORD="Tony@2024!"
```

### 4. Database Initialization
This project uses SQLite for local development. Run these commands to set up the database:
```bash
# Generate Prisma Client
npx prisma generate

# Sync schema with local dev.db
npx prisma db push

# Seed the admin user and sample projects
npm run db:seed
```

### 5. Run the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to see the results.

## 🔐 Admin Access
To manage projects, log in to the admin dashboard:
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `tony@tonymendes.com`
- **Password**: `Tony@2024!`

---
Built for Tony Mendes.

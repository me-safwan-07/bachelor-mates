# Bachelor-Mate 🎓

Your ultimate study material platform for bachelor's students. Access high-quality notes, previous year papers, and premium resources to excel in your academics.

![Bachelor-Mate Preview](./public/image-removebg-preview.jpg
)

## Features ✨

- **Auth System** 🔐
  - Email/password authentication
  - Google OAuth login
  - Password reset flow
  - Email verification
  - Protected routes middleware

- **Study Materials** 📚
  - Free notes & question papers
  - Premium handwritten notes
  - Smart search & filters
  - Download tracking

- **Dashboard** 📊
  - User profile management
  - Download history
  - Bookmarks system
  - Purchase tracking

- **E-commerce** 🛒
  - Shopping cart functionality
  - Premium note purchases
  - Order management

- **Additional Features** 🌟
  - Responsive UI with dark mode
  - Animated components
  - Email notifications system
  - Rate limiting & API security

## Tech Stack 💻

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **State Management**: Jotai
- **Animations**: Framer Motion
- **Emails**: React Email + Nodemailer
- **Deployment**: Vercel

## Getting Started 🚀

### Prerequisites

- Node.js v18+
- PostgreSQL database
- Google OAuth credentials
- SMTP email service (e.g., Resend)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bachelor-mate.git
cd bachelor-mate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (.env):
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# SMTP Configuration
SMTP_HOST="..."
SMTP_PORT="..."
SMTP_USER="..."
SMTP_PASSWORD="..."
MAIL_FROM="no-reply@bacheloremate.com"
```

4. Database setup:
```bash
npx prisma generate
```

5. Run development server:
```bash
npm run dev
```

## Configuration ⚙️

### Google OAuth
1. Create project at [Google Cloud Console](https://console.cloud.google.com/)
2. Add authorized redirect URI: `${NEXTAUTH_URL}/api/auth/callback/google`

### SMTP Setup
We recommend using [Resend](https://resend.com) for transaction emails. Alternatively, configure your own SMTP service.

## Scripts 📜

- `dev`: Start development server
- `build`: Create production build
- `start`: Start production server
- `lint`: Run ESLint
- `prisma:generate`: Generate Prisma client
- `prisma:migrate`: Run database migrations

## Contributing 🤝

Contributions are welcome! Please follow these steps:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Muhammed Safwan | [Live Demo](https://bacheloremate.vercel.app) | [Report Bug](https://github.com/yourusername/bachelor-mate/issues)

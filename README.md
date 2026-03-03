# AI Mock Interview Platform

An AI-powered interview preparation platform that helps users practice and improve their interview skills through realistic mock interviews with instant feedback.

## 🚀 Features

- **AI-Powered Mock Interviews**: Practice with realistic interview questions tailored to specific roles
- **Instant Feedback**: Receive detailed feedback on your responses in real-time
- **MAANG Company Patterns**: Specialized interview patterns for top tech companies (Meta, Apple, Amazon, Netflix, Google)
- **Premium Features**: Access to advanced interview patterns and detailed analytics
- **Speech Recognition**: Practice speaking your answers with speech-to-text capabilities
- **User Authentication**: Secure sign-in and user management
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: Next-auth
- **Database**: Prisma with PostgreSQL
- **AI Integration**: Google Generative AI
- **UI Components**: Shadcn UI
- **Speech Recognition**: React Hook Speech to Text
- **Styling**: Tailwind CSS, Class Variance Authority

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-mock-interview.git
   cd ai-mock-interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
    GOOGLE_CLIENT_ID=867139121052-hh5n9gj82s8pd6qrmkpekiq4neq3fes5.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=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
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=abcdefg
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
   ```

   Create a `.env.local` file in the root directory with the following variables:
   ```
    NEXT_PUBLIC_NEON_URL = postgresql:/neondb_owner:npg_N1sXp5wIQMbz@ep-patient-firefly-a5n9yuiq-pooler.us-east-2.aws.neon.tech/ai-interview-mock?sslmode=require

    NEXT_PUBLIC_GEMINI_API_KEY = AIzaSyABE8zYB2G8QijFpqczfjPWFI0d24WejMQ

    NEXT_PUBLIC_INTERVIEW_PRO_TIP = Click on the Record button to start recording your answer. Make sure to speak clearly and confidently. Please do not use any external help or refer to notes while answering.
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🌐 Deployed Website
 [https://team-mavericks-ai-mock.vercel.app/](https://team-mavericks-ai-mock.vercel.app/)

## 📁 Project Structure

```
├── app/                   # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── fullstack/         # Fullstack interview patterns
│   ├── premium/           # Premium features
│   └── _components/       # Shared components
├── components/            # UI components
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── utils/                 # Utility functions
```

## 🔐 Google Auth with Supabase

If you are using Supabase OAuth (current setup), you do not place `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET` in this app. Instead:

- Configure Google in Supabase Dashboard → Auth → Providers → Google
  - Create Google OAuth credentials in Google Cloud Console (type: Web application)
  - Authorized redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`
  - Paste the Google Client ID/Secret into Supabase
- Set these app env vars in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Optional (only if you later switch to NextAuth):

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

During local dev, also add your site URL to Supabase Auth settings (Site URL or Additional Redirect URLs):

```
http://localhost:3000
```


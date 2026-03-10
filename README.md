# Epiccotn - Premium E-commerce Platform

Epiccotn is a modern, high-performance e-commerce platform built with Next.js, Supabase, and Stripe. It features a sleek UI, real-time data sync, and a robust admin dashboard.

## 🚀 Quick Start: Run the Site Step-by-Step

Follow these instructions to get the project up and running on your local machine.

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 18.x or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) account
- A [Stripe](https://stripe.com/) account (optional, for payments)

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd Osyndo
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables
Create a `.env.local` file in the root directory and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
```

### 5. Database Setup (Supabase)
This project uses several SQL scripts to set up the database schema and policies. Go to your Supabase project's **SQL Editor** and run the following scripts in order:

1.  `supabase_schema.sql` - Creates the core tables (products, categories, orders).
2.  `supabase_setup_v2.sql` - Additional configuration and schema improvements.
3.  `supabase_admin_policies.sql` - Sets up Row Level Security (RLS) for admin access.
4.  `supabase_rls_public.sql` - Sets up public read access for storefront data.
5.  `supabase_seed_products.sql` - Populates the database with initial product data.
6.  `supabase_auth_triggers.sql` - (Optional) Sets up automated user profile creation.

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🛠 Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Payments**: [Stripe](https://stripe.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Embla Carousel

## 📁 Project Structure
- `/app`: Next.js routes and API endpoints.
- `/components`: Reusable UI components (Hero, ProductGrid, Cart, etc.).
- `/lib`: Helper functions, Supabase client, and utility types.
- `/public`: Static assets (images, icons).
- `/scripts`: Custom scripts for data migration or seeding.
- `*.sql`: Database migration and setup scripts.

## 📦 Deployment
The easiest way to deploy is using [Vercel](https://vercel.com/):
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your Environment Variables in the Vercel dashboard.
4. Deploy!

## 📜 License
This project is licensed under the MIT License.

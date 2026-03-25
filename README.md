# Epiccotn - Premium Wellness E-commerce Platform

Epiccotn is a modern, high-performance e-commerce platform specializing in premium bamboo and cotton wellness apparel. Built with Next.js 15, Supabase, and Stripe, it features a sleek high-end UI, real-time inventory sync, and a premium mobile-first shopping experience.

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
cd EpicCotnSite
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
This project uses several SQL scripts located in the `supabase/migrations` folder. Go to your Supabase project's **SQL Editor** and run the key scripts in order:

1.  `supabase/migrations/supabase_schema.sql` - Core schema (products, categories, orders).
2.  `supabase/migrations/supabase_setup_v2.sql` - Refined schema and constraints.
3.  `supabase/migrations/supabase_admin_policies.sql` - Admin security policies.
4.  `supabase/migrations/supabase_rls_public.sql` - Public storefront security policies.
5.  `supabase/migrations/supabase_seed_products.sql` - Initial product catalog.

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Payments**: [Stripe](https://stripe.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📁 Project Structure
- `/app`: Next.js 15 App Router (Storefront, Admin, API).
- `/components`: Premium UI components (Hero, Cart Drawer, Notifications).
- `/hooks`: Custom React hooks for cart and authentication.
- `/lib`: Supabase clients, utility functions, and shared types.
- `/public`: High-resolution product assets and media.
- `/scripts`: Administrative maintenance and data sync utilities.
- `/supabase/migrations`: Versioned database schema and security scripts.

## 📦 Deployment
The easiest way to deploy is using [Vercel](https://vercel.com/):
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Configure Environment Variables and Deploy!

## 📜 License
This project is licensed under the MIT License.
